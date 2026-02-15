
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


export async function POST(req: NextRequest) {
    console.log('API: POST /api/faculty called');
    try {
        const formData = await req.formData();
        const id = formData.get('id') as string | null;
        const supabase = getAdminClient();

        console.log(`API: Processing request. ID: ${id || 'NEW'}`);

        // Prepare Data
        const facultyData: any = {
            name: formData.get('name') as string,
            role: formData.get('role') as string,
            bio: formData.get('bio') as string,
            email: formData.get('email') as string,
            schoolId: formData.get('schoolId') as string,
            departmentId: (formData.get('departmentId') as string) || null,
        };


        let result;
        if (id) {
            // UPDATE
            console.log('API: Updating record...', facultyData);
            const { data, error } = await supabase
                .from('Faculty')
                .update(facultyData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            result = data;
        } else {
            // CREATE
            console.log('API: Creating record...', facultyData);
            const { data, error } = await supabase
                .from('Faculty')
                .insert(facultyData)
                .select()
                .single();

            if (error) throw error;
        }

        // Handle Head of Department Assignment
        // 1. Always unassign them from being head of ANY department first (enforce single headship/cleanup)
        //    This handles cases where they moved departments or were demoted.
        const facultyId = result?.id;
        const isHeadOfDepartment = formData.get('isHeadOfDepartment') === 'on';

        if (facultyId) {
            // Validate: If they want to be head, they must have a department
            if (isHeadOfDepartment && !facultyData.departmentId) {
                // Warning: trying to be head of nothing
                console.warn("API: Faculty tried to be Head but no departmentId provided.");
            } else {
                // Remove from all existing headships
                if (!isHeadOfDepartment) {
                    // Only remove if they are NOT selected (explicit removal) or just cleanup
                    // But wait, if I save a user who is head of Dept A, but I accidentally selected Dept B in UI (unlikely),
                    // and didn't check the box.
                    // Let's trust the checkbox.
                    await supabase.from('Department')
                        .update({ headOfDepartmentId: null })
                        .eq('headOfDepartmentId', facultyId);
                } else {
                    // They WANT to be head.
                    // First, remove them from any OTHER departments (or even the same one to be safe)
                    await supabase.from('Department')
                        .update({ headOfDepartmentId: null })
                        .eq('headOfDepartmentId', facultyId);

                    // Now assign to the new department
                    if (facultyData.departmentId) {
                        const { error: deptError } = await supabase.from('Department')
                            .update({ headOfDepartmentId: facultyId })
                            .eq('id', facultyData.departmentId);

                        if (deptError) console.error("API: Failed to update Department Head:", deptError);
                    }
                }
            }
        }

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
