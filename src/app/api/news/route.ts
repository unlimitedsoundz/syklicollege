
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

// Service Role Client (for Admin operations)
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
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    console.log('API: Uploading file to bucket:', bucket, 'name:', file.name, 'size:', file.size);

    // Convert File to Buffer for more reliable upload in Node environment
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, buffer, {
            contentType: file.type,
            upsert: false
        });

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
    console.log('API: POST /api/news called');
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
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const slug = formData.get('slug') as string;
        const publishDate = formData.get('publishDate') as string;

        // Generate excerpt from content (first 160 chars)
        const excerpt = content
            ? content.replace(/[#*`]/g, '').slice(0, 160).trim() + '...'
            : '';

        const newsData: any = {
            title,
            slug,
            content,
            excerpt,
            publishDate,
        };

        if (imageUrl) {
            newsData.imageUrl = imageUrl;
        }

        let result;
        if (id) {
            // UPDATE
            console.log('API: Updating News record...', id);
            const { data, error } = await supabase
                .from('News')
                .update(newsData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            result = data;
        } else {
            // CREATE
            console.log('API: Creating News record...');
            const { data, error } = await supabase
                .from('News')
                .insert({ ...newsData, published: true })
                .select()
                .single();

            if (error) throw error;
            result = data;
        }

        // Revalidate Paths
        revalidatePath('/admin/news');
        revalidatePath('/news');
        revalidatePath('/');
        if (id) revalidatePath(`/news/${id}`);
        if (newsData.slug) revalidatePath(`/news/${newsData.slug}`);

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
