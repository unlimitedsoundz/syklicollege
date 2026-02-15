import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CaretLeft as ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import HousingManagementClient from './HousingManagementClient';

export default async function AdminHousingPage() {
    const supabase = await createClient();

    // Check authentication and admin role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/portal/account/login');

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'ADMIN') {
        redirect('/portal/dashboard');
    }

    // Fetch all housing applications with student info
    const { data: applications, error: appError } = await supabase
        .from('housing_applications')
        .select('*')
        .order('created_at', { ascending: false });

    console.log('Applications:', applications, 'Error:', appError);

    // Debug: Check what students exist
    const { data: allStudents } = await supabase.from('students').select('id, student_id, user_id');
    console.log('All students in database:', allStudents);

    // Fetch student and profile data for each application
    let applicationsWithDetails = [];
    if (applications) {
        applicationsWithDetails = await Promise.all(
            applications.map(async (app) => {
                console.log('Processing application:', app.id, 'student_id:', app.student_id);

                const { data: student, error: studentError } = await supabase
                    .from('students')
                    .select('id, student_id, user_id')
                    .eq('id', app.student_id)
                    .single();

                console.log('Student lookup result:', student, 'Error:', studentError);

                let userProfile = null;
                if (student?.user_id) {
                    const { data: profile, error: profileError } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', student.user_id)
                        .single();
                    console.log('Profile lookup result (all fields):', profile, 'Error:', profileError);
                    userProfile = profile;
                }

                const { data: semester } = await supabase
                    .from('semesters')
                    .select('name')
                    .eq('id', app.semester_id)
                    .single();

                let building = null;
                if (app.preferred_building_id) {
                    const { data: bldg } = await supabase
                        .from('housing_buildings')
                        .select('name, campus_location')
                        .eq('id', app.preferred_building_id)
                        .single();
                    building = bldg;
                }

                return {
                    ...app,
                    student: student ? {
                        ...student,
                        user: userProfile
                    } : null,
                    semester,
                    preferred_building: building
                };
            })
        );
    }

    // Fetch all available rooms with building info
    const { data: availableRooms } = await supabase
        .from('housing_rooms')
        .select('*, building:housing_buildings(*)')
        .eq('status', 'AVAILABLE')
        .order('building_id');

    // Fetch all housing assignments with complete data
    const { data: assignments, error: assignmentsError } = await supabase
        .from('housing_assignments')
        .select('*')
        .order('created_at', { ascending: false });

    console.log('Assignments:', assignments, 'Error:', assignmentsError);

    // Fetch student, room, and building data for each assignment
    let assignmentsWithDetails = [];
    if (assignments) {
        assignmentsWithDetails = await Promise.all(
            assignments.map(async (assignment) => {
                // Get student data
                const { data: student } = await supabase
                    .from('students')
                    .select('id, student_id, user_id')
                    .eq('id', assignment.student_id)
                    .single();

                let userProfile = null;
                if (student?.user_id) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', student.user_id)
                        .single();
                    userProfile = profile;
                }

                // Get room data
                const { data: room } = await supabase
                    .from('housing_rooms')
                    .select('*')
                    .eq('id', assignment.room_id)
                    .single();

                // Get building data
                let building = null;
                if (room?.building_id) {
                    const { data: bldg } = await supabase
                        .from('housing_buildings')
                        .select('name, campus_location')
                        .eq('id', room.building_id)
                        .single();
                    building = bldg;
                }

                return {
                    ...assignment,
                    student: student ? {
                        ...student,
                        user: userProfile
                    } : null,
                    room: room ? {
                        ...room,
                        building
                    } : null
                };
            })
        );
    }

    // Fetch all buildings for stats
    const { data: buildings } = await supabase
        .from('housing_buildings')
        .select('*')
        .order('name');

    return (
        <div className="min-h-screen bg-neutral-50/50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
                    >
                        <ArrowLeft size={14} /> Back to Admin Dashboard
                    </Link>
                </div>

                <HousingManagementClient
                    applications={applicationsWithDetails || []}
                    availableRooms={availableRooms || []}
                    assignments={assignmentsWithDetails || []}
                    buildings={buildings || []}
                />
            </div>
        </div>
    );
}
