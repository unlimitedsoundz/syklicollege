import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        // Check authentication and admin role
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (profile?.role !== 'ADMIN') {
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
        }

        const { applicationId, roomId } = await request.json();

        if (!applicationId || !roomId) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        // Get the application details
        const { data: application, error: appError } = await supabase
            .from('housing_applications')
            .select('*')
            .eq('id', applicationId)
            .single();

        console.log('Fetching application:', applicationId, 'Result:', application, 'Error:', appError);

        if (appError || !application) {
            return NextResponse.json({
                success: false,
                error: `Application not found: ${appError?.message || 'No application data'}`
            }, { status: 404 });
        }

        // Get student info separately
        const { data: student, error: studentError } = await supabase
            .from('students')
            .select('id')
            .eq('id', application.student_id)
            .single();

        console.log('Fetching student:', application.student_id, 'Result:', student, 'Error:', studentError);

        if (studentError || !student) {
            return NextResponse.json({
                success: false,
                error: `Student not found: ${studentError?.message || 'No student data'}`
            }, { status: 404 });
        }

        // Check if room is available
        const { data: room, error: roomError } = await supabase
            .from('housing_rooms')
            .select('*')
            .eq('id', roomId)
            .eq('status', 'AVAILABLE')
            .single();

        if (roomError || !room) {
            return NextResponse.json({ success: false, error: 'Room not available' }, { status: 400 });
        }

        // Create the assignment
        const { data: assignment, error: assignmentError } = await supabase
            .from('housing_assignments')
            .insert({
                application_id: applicationId,
                room_id: roomId,
                student_id: student.id,
                start_date: application.move_in_date,
                end_date: application.move_out_date,
                status: 'ASSIGNED'
            })
            .select()
            .single();

        if (assignmentError) {
            return NextResponse.json({ success: false, error: assignmentError.message }, { status: 500 });
        }

        // Update application status to APPROVED
        const { error: updateAppError } = await supabase
            .from('housing_applications')
            .update({ status: 'APPROVED' })
            .eq('id', applicationId);

        if (updateAppError) {
            console.error('Failed to update application status:', updateAppError);
        }

        // Update room status to OCCUPIED
        const { error: updateRoomError } = await supabase
            .from('housing_rooms')
            .update({ status: 'OCCUPIED' })
            .eq('id', roomId);

        if (updateRoomError) {
            console.error('Failed to update room status:', updateRoomError);
        }

        return NextResponse.json({
            success: true,
            assignment
        });

    } catch (error: any) {
        console.error('Error assigning room:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to assign room'
        }, { status: 500 });
    }
}
