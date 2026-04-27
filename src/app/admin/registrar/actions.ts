
// Removed 'use server' for static export compatibility.

// Moved imports inside functions for static export compatibility.
// import { createServiceRoleClient } from '@/utils/supabase/server-admin';
// import { revalidatePath } from 'next/cache';

export async function updateWindowStatus(windowId: string, status: 'OPEN' | 'CLOSED') {
    if (typeof window !== 'undefined') throw new Error('Not supported in static export');
    const { createServiceRoleClient } = await import('@/utils/supabase/server-admin');
    const { revalidatePath } = await import('next/cache');
    const supabase = createServiceRoleClient();
    const { error } = await supabase
        .from('registration_windows')
        .update({ status })
        .eq('id', windowId);

    if (error) throw new Error(error.message);
    revalidatePath('/admin/registrar');
    return { success: true };
}

export async function saveWindow(data: any, id?: string) {
    if (typeof window !== 'undefined') throw new Error('Not supported in static export');
    const { createServiceRoleClient } = await import('@/utils/supabase/server-admin');
    const { revalidatePath } = await import('next/cache');
    const supabase = createServiceRoleClient();
    
    // Ensure dates are valid or null
    const formattedData = {
        semester_id: data.semester_id,
        status: data.status,
        open_at: data.open_at || null,
        close_at: data.close_at || null,
        add_drop_deadline: data.add_drop_deadline || null
    };

    if (id) {
        const { error } = await supabase
            .from('registration_windows')
            .update(formattedData)
            .eq('id', id);
        if (error) throw new Error(error.message);
    } else {
        const { error } = await supabase
            .from('registration_windows')
            .insert(formattedData);
        if (error) throw new Error(error.message);
    }

    revalidatePath('/admin/registrar');
    return { success: true };
}

export async function saveSemester(data: any, id?: string) {
    if (typeof window !== 'undefined') throw new Error('Not supported in static export');
    const { createServiceRoleClient } = await import('@/utils/supabase/server-admin');
    const { revalidatePath } = await import('next/cache');
    const supabase = createServiceRoleClient();
    
    const formattedData = {
        name: data.name,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        status: data.status
    };

    if (id) {
        const { error } = await supabase
            .from('semesters')
            .update(formattedData)
            .eq('id', id);
        if (error) throw new Error(error.message);
    } else {
        const { error } = await supabase
            .from('semesters')
            .insert(formattedData);
        if (error) throw new Error(error.message);
    }

    revalidatePath('/admin/registrar');
    return { success: true };
}

export async function updateSemesterStatus(semesterId: string, status: 'ACTIVE' | 'COMPLETED' | 'UPCOMING') {
    if (typeof window !== 'undefined') throw new Error('Not supported in static export');
    const { createServiceRoleClient } = await import('@/utils/supabase/server-admin');
    const { revalidatePath } = await import('next/cache');
    const supabase = createServiceRoleClient();
    const { error } = await supabase
        .from('semesters')
        .update({ status })
        .eq('id', semesterId);

    if (error) throw new Error(error.message);
    revalidatePath('/admin/registrar');
    return { success: true };
}

export async function finalizeGrade(enrollmentId: string) {
    if (typeof window !== 'undefined') throw new Error('Not supported in static export');
    const { createServiceRoleClient } = await import('@/utils/supabase/server-admin');
    const { revalidatePath } = await import('next/cache');
    const supabase = createServiceRoleClient();
    const { error } = await supabase
        .from('module_enrollments')
        .update({
            grade_status: 'FINAL',
            finalized_at: new Date().toISOString()
        })
        .eq('id', enrollmentId);

    if (error) throw new Error(error.message);
    revalidatePath('/admin/registrar');
    return { success: true };
}

export async function updateStudentStatusRegistrar(studentId: string, status: string) {
    if (typeof window !== 'undefined') throw new Error('Not supported in static export');
    const { createServiceRoleClient } = await import('@/utils/supabase/server-admin');
    const { revalidatePath } = await import('next/cache');
    const supabase = createServiceRoleClient();
    const { error } = await supabase
        .from('students')
        .update({ enrollment_status: status })
        .eq('id', studentId);

    if (error) throw new Error(error.message);
    revalidatePath('/admin/registrar');
    return { success: true };
}

export async function saveSession(data: any, id?: string) {
    if (typeof window !== 'undefined') throw new Error('Not supported in static export');
    const { createServiceRoleClient } = await import('@/utils/supabase/server-admin');
    const { revalidatePath } = await import('next/cache');
    const supabase = createServiceRoleClient();
    if (id) {
        const { error } = await supabase
            .from('class_sessions')
            .update(data)
            .eq('id', id);
        if (error) throw new Error(error.message);
    } else {
        const { error } = await supabase
            .from('class_sessions')
            .insert(data);
        if (error) throw new Error(error.message);
    }
    revalidatePath('/admin/registrar');
    return { success: true };
}

export async function deleteSession(id: string) {
    if (typeof window !== 'undefined') throw new Error('Not supported in static export');
    const { createServiceRoleClient } = await import('@/utils/supabase/server-admin');
    const { revalidatePath } = await import('next/cache');
    const supabase = createServiceRoleClient();
    const { error } = await supabase
        .from('class_sessions')
        .delete()
        .eq('id', id);
    if (error) throw new Error(error.message);
    revalidatePath('/admin/registrar');
    return { success: true };
}

export async function deleteWindow(id: string) {
    if (typeof window !== 'undefined') throw new Error('Not supported in static export');
    const { createServiceRoleClient } = await import('@/utils/supabase/server-admin');
    const { revalidatePath } = await import('next/cache');
    const supabase = createServiceRoleClient();
    const { error } = await supabase
        .from('registration_windows')
        .delete()
        .eq('id', id);
    if (error) throw new Error(error.message);
    revalidatePath('/admin/registrar');
    return { success: true };
}

export async function deleteSemester(id: string) {
    if (typeof window !== 'undefined') throw new Error('Not supported in static export');
    const { createServiceRoleClient } = await import('@/utils/supabase/server-admin');
    const { revalidatePath } = await import('next/cache');
    const supabase = createServiceRoleClient();
    const { error } = await supabase
        .from('semesters')
        .delete()
        .eq('id', id);
    if (error) throw new Error(error.message);
    revalidatePath('/admin/registrar');
    return { success: true };
}
