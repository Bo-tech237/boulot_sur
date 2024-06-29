'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Toolbar from './Toolbar';

const Tiptap = ({
    onChange,
    description,
}: {
    description: string;
    onChange: (richText: string) => void;
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right'],
                defaultAlignment: 'left',
            }),
        ],
        content: description,
        editorProps: {
            attributes: {
                class: 'min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="flex flex-col gap-4 justify-stretch min-h-[250px]">
            <Toolbar editor={editor} />
            <EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
        </div>
    );
};

export default Tiptap;
