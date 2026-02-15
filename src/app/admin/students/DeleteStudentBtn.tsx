'use client';

import { Trash } from "@phosphor-icons/react/dist/ssr";
import { deleteStudent } from '../actions';

export default function DeleteStudentBtn({ id }: { id: string }) {
    return (
        <form
            action={deleteStudent.bind(null, id)}
            onSubmit={(e) => {
                if (!confirm('Are you sure you want to delete this student record? This will also remove all their registrations.')) {
                    e.preventDefault();
                }
            }}
        >
            <button className="text-neutral-400 hover:text-red-600 transition-colors p-1" title="Delete Student">
                <Trash size={14} weight="bold" />
            </button>
        </form>
    );
}
