'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { default as Dynamic } from 'next/dynamic';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { ArrowLeft, Upload } from "@phosphor-icons/react";

const ReactQuill = Dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

interface FormData {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    imageUrl: string;
    publishDate: string;
    published: boolean;
}

export default function EditBlogPost() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    if (!id) {
        return <div className="p-8">Invalid blog post ID</div>;
    }
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const quillRef = useRef<any>();
    const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>();

    const content = watch('content');

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (file) {
                setUploading(true);
                const supabase = createClient();
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const { data, error } = await supabase.storage
                    .from('blog-images')
                    .upload(fileName, file);

                if (!error) {
                    const { data: { publicUrl } } = supabase.storage
                        .from('blog-images')
                        .getPublicUrl(fileName);

                    const quill = quillRef.current?.getEditor();
                    const range = quill.getSelection();
                    quill.insertEmbed(range.index, 'image', publicUrl);
                }
                setUploading(false);
            }
        };
    };

    useEffect(() => {
        if (id) fetchPost();
    }, [id]);

    async function fetchPost() {
        const supabase = createClient();
        const { data } = await supabase.from('blogs').select('*').eq('id', id).single();
        if (data) {
            reset({
                ...data,
                publishDate: new Date(data.publishDate).toISOString().slice(0, 16),
            });
        }
        setLoading(false);
    }

    const onSubmit = async (data: FormData) => {
        const supabase = createClient();
        const { error } = await supabase.from('blogs').update({
            ...data,
            publishDate: new Date(data.publishDate).toISOString(),
        }).eq('id', id);
        if (error) alert('Error updating post');
        else router.push('/admin/blog');
    };

    const uploadImage = async (file: File) => {
        setUploading(true);
        const supabase = createClient();
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
            .from('blog-images')
            .upload(fileName, file);

        if (error) {
            alert('Error uploading image');
        } else {
            const { data: { publicUrl } } = supabase.storage
                .from('blog-images')
                .getPublicUrl(fileName);
            setValue('imageUrl', publicUrl);
        }
        setUploading(false);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <Link href="/admin/blog" className="text-gray-600 hover:text-black flex items-center gap-2">
                    <ArrowLeft size={20} /> Back to Blog Management
                </Link>
            </div>

            <h1 className="text-2xl font-bold mb-8">Edit Blog Post</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block font-medium mb-2">Title</label>
                    <input {...register('title', { required: true })} className="w-full p-2 border rounded" />
                </div>

                <div>
                    <label className="block font-medium mb-2">Slug</label>
                    <input {...register('slug', { required: true })} className="w-full p-2 border rounded" />
                </div>

                <div>
                    <label className="block font-medium mb-2">Excerpt</label>
                    <textarea {...register('excerpt')} className="w-full p-2 border rounded" rows={3} />
                </div>

                <div>
                    <label className="block font-medium mb-2">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files && uploadImage(e.target.files[0])}
                        className="mb-2"
                    />
                    {uploading && <p>Uploading...</p>}
                    {watch('imageUrl') && <img src={watch('imageUrl')} alt="Preview" className="w-32 h-32 object-cover" />}
                    <input {...register('imageUrl')} type="hidden" />
                </div>

                <div>
                    <label className="block font-medium mb-2">Content</label>
                    <ReactQuill
                        ref={quillRef}
                        value={content}
                        onChange={(value) => setValue('content', value)}
                        theme="snow"
                        modules={{
                            toolbar: {
                                container: [
                                    [{ 'header': [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                    ['link', 'image'],
                                    ['clean']
                                ],
                                handlers: {
                                    image: imageHandler
                                }
                            },
                        }}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">Publish Date</label>
                    <input {...register('publishDate', { required: true })} type="datetime-local" className="p-2 border rounded" />
                </div>

                <div>
                    <label className="flex items-center gap-2">
                        <input {...register('published')} type="checkbox" />
                        Published
                    </label>
                </div>

                <button type="submit" className="bg-black text-white px-6 py-2 rounded">Update Post</button>
            </form>
        </div>
    );
}