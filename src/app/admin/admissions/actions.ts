import { createClient } from '@/utils/supabase/client';
import { ApplicationStatus } from '@/types/database';

export async function updateApplicationStatus(applicationId: string, status: ApplicationStatus) {
    const supabase = createClient();

    const { error } = await supabase
        .from('applications')
        .update({
            status,
            updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

    if (error) {
        console.error('Error updating application status:', error);
        throw new Error('Failed to update status');
    }

    // TRIGGER LOGIC: Automatically create admission offer + generate Letter of Offer on approval
    if (status === 'ADMITTED') {
        try {
            // Auto-create admission_offers record if one doesn't exist yet
            const { data: existingOffer } = await supabase
                .from('admission_offers')
                .select('id')
                .eq('application_id', applicationId)
                .maybeSingle();

            if (!existingOffer) {
                // Fetch application with course + school to compute real tuition
                const { data: appData } = await supabase
                    .from('applications')
                    .select('course_id, Course:course_id(degreeLevel, school:schoolId(slug))')
                    .eq('id', applicationId)
                    .single();

                const courseData = (appData as any)?.Course;
                const degreeLevel = courseData?.degreeLevel || 'BACHELOR';
                const schoolSlug = courseData?.school?.slug || 'technology';

                // Use tuition.ts computation (source of truth)
                const { getTuitionFee, mapSchoolToTuitionField, calculateDiscountedFee } = await import('@/utils/tuition');
                const tuitionField = mapSchoolToTuitionField(schoolSlug);
                const baseFee = getTuitionFee(degreeLevel, tuitionField);
                const discountedFee = calculateDiscountedFee(baseFee);
                const discountAmount = baseFee - discountedFee;

                const deadline = new Date();
                deadline.setDate(deadline.getDate() + 30); // 30 day deadline

                await supabase
                    .from('admission_offers')
                    .insert({
                        application_id: applicationId,
                        tuition_fee: discountedFee,
                        discount_amount: discountAmount,
                        payment_deadline: deadline.toISOString(),
                        offer_type: 'FULL',
                        status: 'PENDING'
                    });
            }

            const { generateAndStoreOfferLetter } = await import('./pdf-actions');
            await generateAndStoreOfferLetter(applicationId);
        } catch (pdfError) {
            console.error('Failed to generate automated offer letter:', pdfError);
        }
    }


    // NOTE: Admission Letter generation for ENROLLED status has been moved
    // to the payment action (src/app/portal/application/payment/actions.ts).
    // It is auto-triggered only after confirmed payment.



    return { success: true };
}

export async function deleteApplication(applicationId: string) {
    const supabase = createClient();

    const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', applicationId);

    if (error) {
        console.error('Error deleting application:', error);
        throw new Error('Failed to delete application');
    }
    return { success: true };
}

export async function updateInternalNotes(applicationId: string, notes: string) {
    const supabase = createClient();

    const { error } = await supabase
        .from('applications')
        .update({
            internal_notes: notes,
            updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

    if (error) {
        console.error('Error updating internal notes:', error);
        throw new Error('Failed to update notes');
    }
    return { success: true };
}

export async function createAdmissionOffer(applicationId: string, tuitionFee: number, deadline: string, offerType: 'DEPOSIT' | 'FULL_TUITION' = 'DEPOSIT', discountAmount: number = 0) {
    const supabase = createClient();

    const { error } = await supabase
        .from('admission_offers')
        .insert({
            application_id: applicationId,
            tuition_fee: tuitionFee,
            payment_deadline: deadline,
            offer_type: offerType,
            discount_amount: discountAmount,
            status: 'PENDING'
        });

    if (error) {
        console.error('Error creating offer:', error);
        throw new Error('Failed to create offer');
    }

    // Trigger PDF Generation & Email
    try {
        const { generateAndStoreOfferLetter } = await import('./pdf-actions');
        await generateAndStoreOfferLetter(applicationId);
    } catch (pdfError) {
        console.error('Failed to generate offer letter after manual creation:', pdfError);
        // We don't throw here to avoid rolling back the offer creation, but we log the error.
    }


    return { success: true };
}

export async function regenerateOfferLetter(applicationId: string) {
    try {
        const { generateAndStoreOfferLetter } = await import('./pdf-actions');
        const result = (await generateAndStoreOfferLetter(applicationId)) as any;
        if (result && result.error) throw new Error(result.error);
        return { success: true };
    } catch (error: any) {
        console.error('Action Error: regenerateOfferLetter:', error);
        return { success: false, error: error.message || 'Failed to regenerate offer letter' };
    }
}

export async function generateAdmissionLetterAction(applicationId: string) {
    try {
        const { generateAndStoreAdmissionLetter } = await import('./pdf-actions');
        const result = (await generateAndStoreAdmissionLetter(applicationId)) as any;
        if (result && result.error) throw new Error(result.error);
        return { success: true, url: result?.url };
    } catch (error: any) {
        console.error('Action Error: generateAdmissionLetterAction:', error);
        return { success: false, error: error.message || 'Failed to generate admission letter' };
    }
}
