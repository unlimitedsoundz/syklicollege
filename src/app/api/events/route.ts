
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

// Service Role Client
function getAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Missing Supabase Credentials');
    }

    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false
        }
    });
}

// Helper to upload file
async function uploadFile(file: File, bucket: string = 'content') {
    if (!file || file.size === 0) return null;
    const supabase = getAdminClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    console.log('API: Uploading file to bucket:', bucket);

    const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

    if (uploadError) {
        console.error('API Upload Error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

    return publicUrl;
}

export async function POST(req: NextRequest) {
    console.log('API: POST /api/events called');
    try {
        const formData = await req.formData();
        const id = formData.get('id') as string | null;
        const supabase = getAdminClient();

        // Handle Image Upload
        const imageFile = formData.get('image') as File;
        let imageUrl = null;
        if (imageFile && imageFile.size > 0) {
            console.log('API: Uploading image...');
            imageUrl = await uploadFile(imageFile);
        }

        // Prepare Data
        const eventData: any = {
            title: formData.get('title') as string,
            slug: formData.get('slug') as string,
            date: formData.get('date') as string,
            location: formData.get('location') as string,
            category: formData.get('category') as string,
            content: formData.get('content') as string,
            // published: true,
        };

        if (imageUrl) {
            eventData.imageUrl = imageUrl;
        }

        let result;
        if (id) {
            // UPDATE
            console.log('API: Updating Event record...', id);
            const { data, error } = await supabase
                .from('Event')
                .update(eventData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            result = data;
        } else {
            // CREATE
            console.log('API: Creating Event record...');
            const { data, error } = await supabase
                .from('Event')
                .insert({ ...eventData, published: true })
                .select()
                .single();

            if (error) throw error;
            result = data;
        }

        // Revalidate Paths
        revalidatePath('/admin/events');
        revalidatePath('/events');
        revalidatePath('/');
        if (id) revalidatePath(`/events/${id}`);

        console.log('API: Success', result);
        return NextResponse.json({ success: true, data: result });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
