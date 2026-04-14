'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { default as Dynamic } from 'next/dynamic';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { ArrowLeft, Upload } from "@phosphor-icons/react";

const CKEditor = Dynamic(() => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor), { ssr: false });
import { ClassicEditor, Essentials, Paragraph, Bold, Italic, Heading, List, Link as CKLink, Image, ImageInsert, ImageToolbar, ImageCaption, ImageStyle, ImageResize, ImageTextAlternative, BlockQuote, CodeBlock, Undo, Font, FontSize, FontColor, FontBackgroundColor, Strikethrough, Underline, Subscript, Superscript, Alignment, Indent, RemoveFormat } from 'ckeditor5';

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
    const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>();

    const [editorData, setEditorData] = useState('');

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
            setEditorData(data.content || '');
        }
        setLoading(false);
    }

    const onSubmit = async (data: FormData) => {
        const supabase = createClient();
        const cleanedContent = data.content
            .replace(/&nbsp;/g, ' ') // ✅ MAIN FIX: Replace non-breaking spaces with normal spaces
            .replace(/\s+/g, ' ')   // Normalize spacing
            .replace(/—/g, '')
            .replace(/word-break:\s*break-all;?/gi, '')
            .replace(/overflow-wrap:\s*anywhere;?/gi, '')
            .replace(/white-space:\s*pre-wrap;?/gi, '')
            .replace(/style="[^"]*"/gi, '') // Remove inline styles
            .replace(/<p><\/p>/g, ''); // Remove empty paragraphs
        const { error } = await supabase.from('blogs').update({
            ...data,
            content: cleanedContent,
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
                        <CKEditor
                            editor={ClassicEditor}
                            data={editorData}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setEditorData(data);
                                setValue('content', data);
                            }}
                            config={{
                                licenseKey: 'GPL',
                                plugins: [Essentials, Paragraph, Bold, Italic, Heading, List, CKLink, Image, ImageInsert, ImageToolbar, ImageCaption, ImageStyle, ImageResize, ImageTextAlternative, BlockQuote, CodeBlock, Undo, Font, FontSize, FontColor, FontBackgroundColor, Strikethrough, Underline, Subscript, Superscript, Alignment, Indent, RemoveFormat],
                                toolbar: ['heading', '|', 'bold', 'italic', 'underline', '|', 'link', 'insertImage', 'imageUpload', '|', 'bulletedList', 'numberedList', '|', 'alignment', '|', 'blockQuote', '|', 'undo', 'redo'],
                                image: {
                                    resizeOptions: [
                                        {
                                            name: 'imageResize:original',
                                            value: null,
                                            label: 'Original'
                                        },
                                        {
                                            name: 'imageResize:50',
                                            value: '50',
                                            label: '50%'
                                        },
                                        {
                                            name: 'imageResize:75',
                                            value: '75',
                                            label: '75%'
                                        }
                                    ],
                                    toolbar: ['imageTextAlternative', 'toggleImageCaption', '|', 'imageStyle:inline', 'imageStyle:block', 'imageStyle:side']
                                }
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