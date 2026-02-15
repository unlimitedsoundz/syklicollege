
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

    console.log('API: Uploading department image to bucket:', bucket);

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
    console.log('API: POST /api/departments called');
    try {
        const formData = await req.formData();
        const id = formData.get('id') as string;
        const supabase = getAdminClient();

        if (!id) {
            return NextResponse.json({ success: false, error: 'Department ID is required' }, { status: 400 });
        }

        console.log(`API: Processing department update for ID: ${id}`);

        // Handle Image Upload
        const imageFile = formData.get('image') as File;
        let imageUrl = null;
        if (imageFile && imageFile.size > 0) {
            console.log('API: Uploading image...');
            imageUrl = await uploadFile(imageFile);
        }

        // Prepare Data
        const updateData: any = {
            name: formData.get('name') as string,
            slug: formData.get('slug') as string,
            description: formData.get('description') as string,
            schoolId: formData.get('schoolId') as string,
            headOfDepartmentId: (formData.get('headOfDepartmentId') as string) || null,
        };

        if (imageUrl) {
            updateData.imageUrl = imageUrl;
        }

        console.log('API: Updating department record...', updateData);

        const { data, error } = await supabase
            .from('Department')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Database update error:', error);
            throw error;
        }

        console.log('API: Department updated successfully');
        return NextResponse.json({ success: true, data });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    console.log('API: DELETE /api/departments called');
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const supabase = getAdminClient();

        if (!id) {
            return NextResponse.json({ success: false, error: 'Department ID is required' }, { status: 400 });
        }

        console.log(`API: Attempting to delete department ID: ${id}`);

        // 1. Check for dependencies (Courses)
        const { count: courseCount, error: courseError } = await supabase
            .from('Course')
            .select('*', { count: 'exact', head: true })
            .eq('departmentId', id);

        if (courseError) throw courseError;
        if (courseCount && courseCount > 0) {
            return NextResponse.json({
                success: false,
                error: `Cannot delete department: It has ${courseCount} associated course(s). Please reassign or delete the courses first.`
            }, { status: 400 });
        }

        // 2. Check for dependencies (Faculty)
        const { count: facultyCount, error: facultyError } = await supabase
            .from('Faculty')
            .select('*', { count: 'exact', head: true })
            .eq('departmentId', id);

        if (facultyError) throw facultyError;
        if (facultyCount && facultyCount > 0) {
            return NextResponse.json({
                success: false,
                error: `Cannot delete department: It has ${facultyCount} associated faculty member(s). Please reassign them first.`
            }, { status: 400 });
        }

        // 3. Perform Deletion
        const { error: deleteError } = await supabase
            .from('Department')
            .delete()
            .eq('id', id);

        if (deleteError) {
            console.error('Database deletion error:', deleteError);
            throw deleteError;
        }

        console.log('API: Department deleted successfully');
        return NextResponse.json({ success: true, message: 'Department deleted successfully' });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
