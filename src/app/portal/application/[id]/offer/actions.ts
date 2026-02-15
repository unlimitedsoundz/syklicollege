'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function respondToOffer(offerId: string, applicationId: string, action: 'ACCEPT' | 'DECLINE') {
    const supabase = createAdminClient();

    const status = action === 'ACCEPT' ? 'ACCEPTED' : 'DECLINED';
    const appStatus = action === 'ACCEPT' ? 'OFFER_ACCEPTED' : 'OFFER_DECLINED';

    // 1. Update the offer status
    const { error: offerError } = await supabase
        .from('admission_offers')
        .update({ status })
        .eq('id', offerId);

    if (offerError) {
        console.error('Error updating offer:', offerError);
        throw new Error('Failed to respond to offer');
    }

    // 2. Update the application status
    const { error: appError } = await supabase
        .from('applications')
        .update({
            status: appStatus,
            updated_at: new Date().toISOString()
        })
        .eq('id', applicationId);

    if (appError) {
        console.error('Error updating application:', appError);
        throw new Error('Failed to update application status');
    }

    revalidatePath(`/portal/application/${applicationId}/offer`);
    revalidatePath('/portal/dashboard');

    return { success: true };
}
