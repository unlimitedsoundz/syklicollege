
'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function updateWindowStatus(windowId: string, status: 'OPEN' | 'CLOSED' | 'UPCOMING' | 'ADD_DROP') {
    const adminClient = createAdminClient();

    try {
        const { error } = await adminClient
            .from('registration_windows')
            .update({ status })
            .eq('id', windowId);

        if (error) throw error;

        revalidatePath('/admin/registrar');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function finalizeGrade(enrollmentId: string) {
    const adminClient = createAdminClient();

    try {
        const { error } = await adminClient
            .from('module_enrollments')
            .update({
                grade_status: 'FINAL',
                finalized_at: new Date().toISOString()
            })
            .eq('id', enrollmentId);

        if (error) throw error;

        revalidatePath('/admin/registrar');
        revalidatePath('/portal/student/records');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateStudentStatus(studentId: string, status: string) {
    const adminClient = createAdminClient();

    try {
        const { error } = await adminClient
            .from('students')
            .update({ enrollment_status: status })
            .eq('id', studentId);

        if (error) throw error;

        revalidatePath('/admin/registrar');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateSemesterStatus(semesterId: string, status: string) {
    const adminClient = createAdminClient();

    try {
        const { error } = await adminClient
            .from('semesters')
            .update({ status })
            .eq('id', semesterId);

        if (error) throw error;

        revalidatePath('/admin/registrar');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
export async function createSession(data: {
    module_id: string;
    semester_id: string;
    day_of_week: number;
    start_time: string;
    end_time: string;
    location_type: 'CAMPUS' | 'ONLINE';
    location_detail: string;
}) {
    const adminClient = createAdminClient();

    try {
        const { error } = await adminClient
            .from('class_sessions')
            .insert(data);

        if (error) throw error;

        revalidatePath('/admin/registrar');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateSession(sessionId: string, data: Partial<{
    module_id: string;
    semester_id: string;
    day_of_week: number;
    start_time: string;
    end_time: string;
    location_type: 'CAMPUS' | 'ONLINE';
    location_detail: string;
}>) {
    const adminClient = createAdminClient();

    try {
        const { error } = await adminClient
            .from('class_sessions')
            .update(data)
            .eq('id', sessionId);

        if (error) throw error;

        revalidatePath('/admin/registrar');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteSession(sessionId: string) {
    const adminClient = createAdminClient();

    try {
        const { error } = await adminClient
            .from('class_sessions')
            .delete()
            .eq('id', sessionId);

        if (error) throw error;

        revalidatePath('/admin/registrar');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
