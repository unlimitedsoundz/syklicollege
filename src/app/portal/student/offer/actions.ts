'use server';

import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function respondToOffer(admissionId: string, decision: 'ACCEPTED' | 'REJECTED') {
    const supabase = await createClient();
    const adminSupabase = createAdminClient();

    // 1. Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    // 2. Fetch the admission record to verify ownership and current status
    const { data: admission, error: fetchError } = await supabase
        .from('admissions')
        .select('*')
        .eq('id', admissionId)
        .eq('user_id', user.id)
        .single();

    if (fetchError || !admission) throw new Error('Offer not found');

    // 3. Prevent multiple responses
    if (admission.offer_status !== 'PENDING') {
        throw new Error('You have already submitted a response to this offer.');
    }

    // 4. Update the record
    const updateData: any = {
        offer_status: decision
    };

    if (decision === 'ACCEPTED') {
        updateData.accepted_at = new Date().toISOString();
    }

    const { error: updateError } = await adminSupabase
        .from('admissions')
        .update(updateData)
        .eq('id', admissionId);

    if (updateError) {
        console.error('Error updating offer response:', updateError);
        console.error('Update data:', updateData);
        console.error('Admission ID:', admissionId);
        throw new Error(`Failed to save your decision: ${updateError.message}`);
    }

    // 5. Trigger next steps / notifications
    if (decision === 'ACCEPTED') {
        // Example: Update application status as well
        await adminSupabase
            .from('applications')
            .update({ status: 'OFFER_ACCEPTED' })
            .eq('user_id', user.id)
            .eq('status', 'ADMITTED');

        // Note: Real automation might trigger an enrollment email or generate student login
    } else {
        // Example: Update application status
        await adminSupabase
            .from('applications')
            .update({ status: 'OFFER_DECLINED' })
            .eq('user_id', user.id)
            .eq('status', 'ADMITTED');

        // Notify admin (simulation)
        console.log(`Admin notified: Student ${user.id} rejected offer for admission ${admissionId}`);
    }

    revalidatePath('/portal/student/offer');
    revalidatePath('/portal/dashboard');
    return { success: true };
}
