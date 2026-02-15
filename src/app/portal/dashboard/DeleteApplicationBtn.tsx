'use client';

import { Trash as Trash2 } from "@phosphor-icons/react/dist/ssr";
import { deleteApplication } from '../actions';
import { useState } from 'react';

export default function DeleteApplicationBtn({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to cancel and delete this application? This action cannot be undone and all uploaded documents will be lost."
        );

        if (!confirmed) return;

        setIsDeleting(true);
        try {
            await deleteApplication(id);
        } catch (error: any) {
            alert(error.message || "Failed to delete application");
            setIsDeleting(false);
        }
    };

    return (
        <form onSubmit={handleDelete}>
            <button
                type="submit"
                disabled={isDeleting}
                className="text-neutral-400 hover:text-red-600 transition-colors p-2 disabled:opacity-50"
                title="Cancel & Delete Application"
            >
                <Trash2 size={16} />
            </button>
        </form>
    );
}
