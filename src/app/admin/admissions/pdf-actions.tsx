import { createClient } from '@/utils/supabase/client';

export async function generateAndStoreOfferLetter(applicationId: string) {
    const supabase = createClient();
    try {
        const { data, error } = await supabase.functions.invoke('generate-admission-letter', {
            body: { applicationId, type: 'OFFER' }
        });
        if (error) throw error;
        return data;
    } catch (e: any) {
        console.error('Error generating offer letter:', e);
        return { success: false, error: e.message };
    }
}

export async function generateAndStoreAdmissionLetter(applicationId: string) {
    const supabase = createClient();
    try {
        const { data, error } = await supabase.functions.invoke('generate-admission-letter', {
            body: { applicationId }
        });
        if (error) throw error;
        return data;
    } catch (e: any) {
        console.error('Error generating admission letter:', e);
        return { success: false, error: e.message };
    }
}
