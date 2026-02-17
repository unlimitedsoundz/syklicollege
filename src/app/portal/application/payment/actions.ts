import { createClient } from '@/utils/supabase/client';

export async function recordTuitionPayment(
    offerId: string,
    applicationId: string,
    amount: number,
    details: {
        method: string;
        country: string;
        currency: string;
        fxMetadata: any;
    }
) {
    console.log('recordTuitionPayment started', { offerId, applicationId, amount });

    try {
        const supabase = createClient();

        // 1. Verify User Session
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            console.error('Auth error', authError);
            throw new Error('Unauthorized: No valid session');
        }

        const reference = `TXN_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

        // 2. Insert Payment Record
        const { error: paymentError } = await supabase
            .from('tuition_payments')
            .insert({
                offer_id: offerId,
                amount: amount,
                status: 'COMPLETED',
                payment_method: details.method,
                transaction_reference: reference,
                country: details.country,
                currency: details.currency,
                fx_metadata: details.fxMetadata
            });

        if (paymentError) {
            console.error('Payment insert failed', paymentError);
            throw new Error(`DB Insert Failed: ${paymentError.message}`);
        }

        // 3. AUTO-ENROLL: Create Student Record & Generate ID
        // We reuse the Admin Action 'enrollStudent' to ensure consistency (creates student record, generates ID, updates profile)
        const { enrollStudent } = await import('@/app/admin/students/actions');
        const enrollmentResult = await enrollStudent(applicationId);

        if (!enrollmentResult.success) {
            console.error('Auto-enrollment failed:', enrollmentResult.error);
            // We don't throw here to avoid failing the payment confirmation to the user, 
            // but we log it. The admin might need to manually enroll if this fails.
        } else {
            console.log('Auto-enrollment successful:', enrollmentResult.studentId);
        }

        // 4. Update Offer Status to PAID
        await supabase
            .from('admission_offers')
            .update({ status: 'PAID' })
            .eq('id', offerId);

        // 5. AUTO-TRIGGER: Generate Official Admission Letter
        // 5. UPDATE: Use Dynamic Admission Letter Page (No PDF Storage)
        const admissionLetterUrl = `https://syklicollege.fi/portal/application/admission-letter?id=${applicationId}`;

        try {
            // Update the offer record with the dynamic link so it appears in Admin/Student portal
            const { error: updateLinkError } = await supabase
                .from('admission_offers')
                .update({ document_url: admissionLetterUrl })
                .eq('id', offerId);

            if (updateLinkError) console.error('Failed to update admission offer link:', updateLinkError);

            console.log('Admission Letter Link updated:', admissionLetterUrl);

            // Trigger Email Notification
            await supabase.functions.invoke('send-notification', {
                body: {
                    applicationId,
                    type: 'ADMISSION_LETTER_READY',
                    documentUrl: admissionLetterUrl
                }
            });
            console.log('Notification triggered with dynamic link.');

        } catch (letterErr) {
            console.error('Failed to send email or update link (non-blocking):', letterErr);
        }

        return { success: true };

    } catch (error: any) {
        console.error('Payment Action Error:', error);
        return { success: false, error: error.message };
    }
}
