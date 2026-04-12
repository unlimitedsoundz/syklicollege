import { createClient } from '@/utils/supabase/client';
import { sendEmail } from '@/lib/email';
import InvoiceReadyEmail from '@/emails/InvoiceReadyEmail';

export async function pushInvoice(applicationId: string, customFee: number, invoiceType: string) {
    const supabase = createClient();

    // Verify application exists and is in a valid state
    const { data: offer, error: offerError } = await supabase
        .from('admission_offers')
        .select('*')
        .eq('application_id', applicationId)
        .single();

    if (offerError || !offer) {
        throw new Error('Admission offer not found for this application');
    }

    // Update the offer with new custom fee and mark as invoiced
    const { error: updateError } = await supabase
        .from('admission_offers')
        .update({
            tuition_fee: customFee,
            invoice_type: invoiceType,
            invoice_pushed: true,
            invoice_sent_at: new Date().toISOString()
        })
        .eq('application_id', applicationId);

    if (updateError) {
        console.error('Error updating admission offer:', updateError);
        throw new Error('Failed to push invoice');
    }

    // Fetch application and user data to send email notification
    const { data: application, error: appError } = await supabase
        .from('applications')
        .select(`
            *,
            course:Course(title),
            user:profiles(first_name, last_name, email, id)
        `)
        .eq('id', applicationId)
        .single();

    if (appError || !application) {
        console.error('Error fetching application data:', appError);
        // Don't throw error here, invoice is already pushed
        return { success: true };
    }

    // Send email notification to student
    try {
        await sendEmail({
            to: application.user?.email || application.contact_details?.email || 'tuition@kestora.online',
            subject: `Your ${invoiceType} Invoice is Ready`,
            react: InvoiceReadyEmail({
                firstName: application.personal_info?.firstName || application.user?.first_name || 'Student',
                courseTitle: application.course?.title || 'Your Programme',
                amount: customFee,
                currency: 'EUR',
                invoiceType,
            }),
        });
    } catch (emailError) {
        console.error('Error sending invoice ready email:', emailError);
        // Don't fail the push if email fails
    }

    return { success: true };
}
