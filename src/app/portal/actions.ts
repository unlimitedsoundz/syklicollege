'use server';

import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createApplication(courseId: string) {
    const supabase = await createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/portal/account/login');
    }

    // Ensure profile exists (defensive in case trigger failed)
    const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

    if (!profile) {
        console.log('Profile missing for user, creating now:', user.id);
        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                id: user.id,
                email: user.email,
                first_name: user.user_metadata?.first_name || 'Applicant',
                last_name: user.user_metadata?.last_name || '',
                role: (user.user_metadata?.role as any) || 'APPLICANT'
            });

        if (profileError) {
            console.error('Error creating profile fallback:', profileError);
            throw new Error(`Failed to create user profile: ${profileError.message}`);
        }
    }

    // Create the application
    const { data, error } = await supabase
        .from('applications')
        .insert({
            user_id: user.id,
            course_id: courseId,
            status: 'DRAFT'
        })
        .select('id')
        .single();

    if (error) {
        console.error('Error creating application:', error);
        throw new Error(`Failed to create application: ${error.message} (${error.code})`);
    }

    revalidatePath('/portal/dashboard');
    redirect(`/portal/application/${data.id}`);
}

export async function updateApplicationStep(id: string, step: string, data: any) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    // Map step to database column
    const columnMap: Record<string, string> = {
        'personal': 'personal_info',
        'contact': 'contact_details',
        'academic': 'education_history',
        'motivation': 'motivation',
        'language': 'language_proficiency'
    };

    const targetColumn = columnMap[step];
    if (!targetColumn) throw new Error('Invalid step');

    // Update the application
    const { error } = await supabase
        .from('applications')
        .update({
            [targetColumn]: data,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        console.error(`Error updating application step ${step}:`, error);
        throw new Error('Failed to save progress');
    }

    revalidatePath(`/portal/application/${id}`);
    return { success: true };
}

export async function addApplicationDocument(applicationId: string, type: string, url: string, name: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    const { error } = await supabase
        .from('application_documents')
        .insert({
            application_id: applicationId,
            type,
            url,
            name
        });

    if (error) {
        console.error('Error adding document meta:', error);
        throw new Error('Failed to save document info');
    }

    revalidatePath(`/portal/application/${applicationId}`);
    return { success: true };
}

export async function deleteApplicationDocument(applicationId: string, documentId: string, storagePath: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    // 1. Delete from Storage
    const { error: storageError } = await supabase.storage
        .from('application-documents')
        .remove([storagePath]);

    if (storageError) {
        console.error('Error deleting from storage:', storageError);
        // Continue to DB delete anyway if storage fails (might be already gone)
    }

    // 2. Delete from DB
    const { error } = await supabase
        .from('application_documents')
        .delete()
        .eq('id', documentId)
        .eq('application_id', applicationId);

    if (error) {
        console.error('Error deleting document meta:', error);
        throw new Error('Failed to delete document info');
    }

    revalidatePath(`/portal/application/${applicationId}`);
    return { success: true };
}

export async function submitApplication(applicationId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    // 1. Basic validation
    const { data: app, error: fetchError } = await supabase
        .from('applications')
        .select('*')
        .eq('id', applicationId)
        .eq('user_id', user.id)
        .single();

    if (fetchError || !app) throw new Error('Application not found');

    if (!app.personal_info || !app.contact_details || !app.education_history) {
        throw new Error('Please complete all required sections before submitting.');
    }

    // 2. Update status
    const { error } = await supabase
        .from('applications')
        .update({
            status: 'SUBMITTED',
            submitted_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        })
        .eq('id', applicationId)
        .eq('user_id', user.id);

    if (error) {
        console.error('Error submitting application:', error);
        throw new Error('Failed to submit application');
    }

    revalidatePath('/portal/dashboard');
    revalidatePath(`/portal/application/${applicationId}`);
    return { success: true };
}

export async function acceptOffer(applicationId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    // 1. Verify Application & Offer
    const { data: app, error: fetchError } = await supabase
        .from('applications')
        .select(`
            id, 
            status,
            offer:admission_offers(id, status)
        `)
        .eq('id', applicationId)
        .eq('user_id', user.id)
        .single();

    if (fetchError || !app) throw new Error('Application not found');

    // Check if capable of accepting
    if (app.status !== 'ADMITTED') {
        throw new Error(`Cannot accept offer in current status: ${app.status}`);
    }

    // Check if offer exists
    const offer = app.offer?.[0] as any;
    if (!offer) throw new Error('No admission offer found to accept.');

    // 2. Transaction: Update Offer -> ACCEPTED, Update App -> OFFER_ACCEPTED
    // Note: Use Admin Client to bypass RLS for these status updates
    const adminSupabase = createAdminClient();

    // Update Offer
    const { error: offerError } = await adminSupabase
        .from('admission_offers')
        .update({ status: 'ACCEPTED' })
        .eq('id', offer.id);

    if (offerError) throw new Error('Failed to update offer status');

    // Update Application
    const { error: appError } = await adminSupabase
        .from('applications')
        .update({
            status: 'OFFER_ACCEPTED',
            updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

    if (appError) throw new Error('Failed to update application status');

    revalidatePath('/portal/dashboard');
    revalidatePath(`/portal/application/${applicationId}`);
    // Redirect to the payment/offer page to continue the flow
    redirect(`/portal/application/${applicationId}/offer/payment`);
}


import { sendEmail } from '@/lib/email';
import OfferRejectionEmail from '@/emails/OfferRejectionEmail';

// ... (existing code: acceptOffer, etc.)

export async function rejectOffer(applicationId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    // 1. Verify Application & Offer
    const { data: app, error: fetchError } = await supabase
        .from('applications')
        .select(`
            id, 
            status,
            user:profiles(first_name, email),
            course:courses(title),
            offer:admission_offers(id, status)
        `)
        .eq('id', applicationId)
        .eq('user_id', user.id)
        .single();

    if (fetchError || !app) throw new Error('Application not found');

    // Check if capable of rejecting
    if (app.status !== 'ADMITTED') {
        throw new Error(`Cannot decline offer in current status: ${app.status}`);
    }

    // Check if offer exists
    const offer = app.offer?.[0] as any;
    if (!offer) throw new Error('No admission offer found to decline.');

    // 2. Transaction: Update Offer -> DECLINED, Update App -> OFFER_DECLINED
    const adminSupabase = createAdminClient();

    // Update Offer
    const { error: offerError } = await adminSupabase
        .from('admission_offers')
        .update({ status: 'DECLINED' })
        .eq('id', offer.id);

    if (offerError) throw new Error('Failed to update offer status');

    // Update Application
    const { error: appError } = await adminSupabase
        .from('applications')
        .update({
            status: 'OFFER_DECLINED',
            updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

    if (appError) throw new Error('Failed to update application status');

    // 3. Send Email Notification
    // We do this asynchronously and don't block the UI response if it fails (log error though)
    try {
        const userProfile = app.user as any;
        const courseTitle = (app.course as any)?.title || 'Program';

        await sendEmail({
            to: userProfile?.email || user.email || '',
            subject: 'Admission Offer Declined - SYKLI College',
            react: OfferRejectionEmail({
                firstName: userProfile?.first_name || 'Applicant',
                applicationId: app.id,
                courseName: courseTitle,
            }),
        });
    } catch (emailError) {
        console.error('Failed to send rejection confirmation email:', emailError);
    }

    revalidatePath('/portal/dashboard');
    revalidatePath(`/portal/application/${applicationId}`);
    redirect('/portal/dashboard');
}

export async function processTuitionPayment(
    offerId: string,
    applicationId: string,
    amount: number,
    method: string = 'SIMULATED_CREDIT_CARD',
    country?: string,
    currency?: string,
    fxMetadata: any = {}
) {
    const supabase = await createClient();
    const adminSupabase = createAdminClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    // 1. Verify Offer exists and belongs to user (via application)
    const { data: offer, error: fetchError } = await supabase
        .from('admission_offers')
        .select('*, application:applications(user_id, status)')
        .eq('id', offerId)
        .single();

    if (fetchError || !offer) throw new Error('Offer not found');

    const app = offer.application as any;
    if (app.user_id !== user.id) throw new Error('Unauthorized access to this offer');

    if (app.status !== 'OFFER_ACCEPTED' && app.status !== 'ADMITTED') {
        if (app.status === 'ENROLLED') throw new Error('Tuition already paid and enrolled.');
    }

    // 2. Create Payment Record
    const reference = `TXN_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const { error: paymentError } = await adminSupabase
        .from('tuition_payments')
        .insert({
            offer_id: offerId,
            amount: amount,
            status: 'COMPLETED',
            payment_method: method,
            transaction_reference: reference,
            country,
            currency,
            fx_metadata: fxMetadata
        });

    if (paymentError) {
        console.error('Payment record error:', paymentError);
        throw new Error(`Failed to record payment: ${paymentError.message}`);
    }

    // 3. Update Application to PAYMENT_SUBMITTED and Offer to ACCEPTED if pending
    const { error: appError } = await adminSupabase
        .from('applications')
        .update({ status: 'PAYMENT_SUBMITTED', updated_at: new Date().toISOString() })
        .eq('id', applicationId);

    if (appError) throw new Error('Failed to finalize enrollment status');

    if (offer.status === 'PENDING') {
        const { error: offerError } = await adminSupabase
            .from('admission_offers')
            .update({ status: 'ACCEPTED' })
            .eq('id', offerId);

        if (offerError) {
            console.error('Failed to update offer status:', offerError);
            // We don't throw here to avoid failing the whole process after payment and app update are done
        }
    }

    // 4. Audit Log for Compliance
    await adminSupabase.from('audit_logs').insert({
        action: 'PAYMENT_CONFIRMED',
        entity_table: 'tuition_payments',
        actor_id: user.id,
        metadata: {
            country,
            currency,
            method,
            reference
        }
    });

    revalidatePath('/portal/dashboard');
    revalidatePath(`/portal/application/${applicationId}`);
    return { success: true, reference };
}

export async function deleteApplication(applicationId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    // 1. Verify ownership and status
    const { data: app, error: fetchError } = await supabase
        .from('applications')
        .select('id, user_id, status')
        .eq('id', applicationId)
        .eq('user_id', user.id)
        .single();

    if (fetchError || !app) throw new Error('Application not found');

    if (app.status === 'ENROLLED') {
        throw new Error('Enrolled applications cannot be deleted. Please contact the registrar.');
    }

    // 2. Delete the application (triggers/cascades should handle related documents/offers)
    const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', applicationId);

    if (error) {
        console.error('Error deleting application:', error);
        throw new Error('Failed to delete application');
    }

    revalidatePath('/portal/dashboard');
    return { success: true };
}
