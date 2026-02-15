import { createClient } from '@/utils/supabase/server';
import { notFound, redirect } from 'next/navigation';
import PaymentView from './PaymentView';

export default async function PaymentPage(props: {
    params: Promise<{ id: string }>
}) {
    const { id } = await props.params;
    const supabase = await createClient();

    // Verify Access
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/portal/account/login');

    const { data: applicationRaw } = await supabase
        .from('applications')
        .select(`
            *,
            offer:admission_offers(*),
            course:Course(duration)
        `)
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

    if (!applicationRaw || !applicationRaw.offer?.[0]) notFound();

    const application = applicationRaw;
    const offer = application.offer[0];

    // Security Check: Only allow if OFFER_ACCEPTED or if already ENROLLED (to view receipt)
    // If just ADMITTED, they should go to Letter page to accept first.
    if (application.status === 'ADMITTED') {
        redirect(`/portal/application/${id}/letter`);
    }

    return (
        <PaymentView
            params={{ id }}
            application={application}
            admissionOffer={offer}
        />
    );
}
