'use client';

import { useEffect, useRef, useState } from 'react';

// CKEditor content styles
import 'ckeditor5/ckeditor5.css';

interface RichTextEditorProps {
    value: string;
    onChange: (data: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    const editorContainerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<any>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let destroyed = false;

        async function initEditor() {
            // Dynamic imports — keeps this out of SSR
            const {
                ClassicEditor,
                Autoformat,
                Bold,
                Italic,
                Underline,
                Strikethrough,
                BlockQuote,
                Base64UploadAdapter,
                Essentials,
                Heading,
                Image,
                ImageCaption,
                ImageResize,
                ImageStyle,
                ImageToolbar,
                ImageUpload,
                Indent,
                IndentBlock,
                Link,
                List,
                MediaEmbed,
                Paragraph,
                PasteFromOffice,
                Table,
                TableColumnResize,
                TableToolbar,
                TextTransformation,
                Alignment,
                Font,
                FontSize,
                FontColor,
                FontBackgroundColor,
                RemoveFormat,
                CodeBlock,
                HorizontalLine,
                Subscript,
                Superscript,
            } = await import('ckeditor5');

            if (destroyed || !editorContainerRef.current) return;

            const editor = await ClassicEditor.create(editorContainerRef.current, {
                licenseKey: 'GPL',
                plugins: [
                    Autoformat,
                    BlockQuote,
                    Bold,
                    Essentials,
                    Heading,
                    Image,
                    ImageCaption,
                    ImageResize,
                    ImageStyle,
                    ImageToolbar,
                    ImageUpload,
                    Base64UploadAdapter,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    List,
                    MediaEmbed,
                    Paragraph,
                    PasteFromOffice,
                    Table,
                    TableColumnResize,
                    TableToolbar,
                    TextTransformation,
                    Underline,
                    Strikethrough,
                    Alignment,
                    Font,
                    FontSize,
                    FontColor,
                    FontBackgroundColor,
                    RemoveFormat,
                    CodeBlock,
                    HorizontalLine,
                    Subscript,
                    Superscript,
                ],
                toolbar: [
                    'undo', 'redo',
                    '|',
                    'heading',
                    '|',
                    'bold', 'italic', 'underline', 'strikethrough',
                    '|',
                    'fontSize', 'fontColor',
                    '|',
                    'link', 'uploadImage', 'insertTable', 'blockQuote', 'codeBlock', 'horizontalLine',
                    '|',
                    'alignment',
                    '|',
                    'bulletedList', 'numberedList',
                    '|',
                    'outdent', 'indent',
                    '|',
                    'removeFormat',
                ],
                heading: {
                    options: [
                        { model: 'paragraph' as const, title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1' as const, view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2' as const, view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3' as const, view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4' as const, view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                    ]
                },
                image: {
                    resizeOptions: [
                        { name: 'resizeImage:original', label: 'Original size', value: null },
                        { name: 'resizeImage:50', label: '50% width', value: '50' },
                        { name: 'resizeImage:75', label: '75% width', value: '75' },
                    ],
                    toolbar: [
                        'imageTextAlternative', 'toggleImageCaption',
                        '|',
                        'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText',
                        '|',
                        'resizeImage',
                    ]
                },
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://',
                },
                table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
                },
                initialData: value,
            });

            if (destroyed) {
                editor.destroy();
                return;
            }

            editorRef.current = editor;
            setIsReady(true);

            editor.model.document.on('change:data', () => {
                onChange(editor.getData());
            });
        }

        initEditor();

        return () => {
            destroyed = true;
            if (editorRef.current) {
                editorRef.current.destroy().catch(console.error);
                editorRef.current = null;
            }
        };
    }, []); // Only mount once

    return (
        <div className="ck-editor-wrapper">
            <div ref={editorContainerRef} />
            {!isReady && (
                <div className="w-full h-[300px] border rounded flex items-center justify-center text-gray-400">
                    Loading editor…
                </div>
            )}
        </div>
    );
}
