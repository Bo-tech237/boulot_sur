import React from 'react';
import { Editor } from '@tiptap/react';
import {
    AlignLeft,
    AlignCenter,
    AlignRight,
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Underline,
    Quote,
    Undo,
    Redo,
    Code,
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

type Props = {
    editor: Editor | null;
};

function Toolbar({ editor }: Props) {
    if (!editor) return null;

    return (
        <div className="rounded-md border border-input bg-background px-3 py-2">
            <Toggle
                size={'sm'}
                onPressedChange={(e) => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}
                pressed={editor.isActive('heading', { level: 2 })}
            >
                <Heading2 className="w-4 h-4" />
            </Toggle>
            <Toggle
                size={'sm'}
                onPressedChange={(e) => {
                    editor.chain().focus().toggleBold().run();
                }}
                pressed={editor.isActive('bold')}
            >
                <Bold className="w-4 h-4" />
            </Toggle>
            <Toggle
                size={'sm'}
                onPressedChange={(e) => {
                    editor.chain().focus().toggleItalic().run();
                }}
                pressed={editor.isActive('italic')}
            >
                <Italic className="w-4 h-4" />
            </Toggle>
            <Toggle
                size={'sm'}
                onPressedChange={(e) => {
                    editor.chain().focus().toggleUnderline().run();
                }}
                pressed={editor.isActive('underline')}
            >
                <Underline className="w-4 h-4" />
            </Toggle>
            <Toggle
                size={'sm'}
                onPressedChange={(e) => {
                    editor.chain().focus().toggleStrike().run();
                }}
                pressed={editor.isActive('strike')}
            >
                <Strikethrough className="w-4 h-4" />
            </Toggle>
            <Toggle
                size={'sm'}
                onPressedChange={(e) => {
                    editor.chain().focus().toggleBulletList().run();
                }}
                pressed={editor.isActive('bulletList')}
            >
                <List className="w-4 h-4" />
            </Toggle>
            <Toggle
                size={'sm'}
                onPressedChange={(e) => {
                    editor.chain().focus().toggleOrderedList().run();
                }}
                pressed={editor.isActive('orderedList')}
            >
                <ListOrdered className="w-4 h-4" />
            </Toggle>
            <Toggle
                size={'sm'}
                onPressedChange={(e) => {
                    editor.chain().focus().setTextAlign('left').run();
                }}
                pressed={editor.isActive({ textAlign: 'left' })}
            >
                <AlignLeft className="w-4 h-4" />
            </Toggle>
            <Toggle
                size={'sm'}
                onPressedChange={(e) => {
                    editor.chain().focus().setTextAlign('center').run();
                }}
                pressed={editor.isActive({ textAlign: 'center' })}
            >
                <AlignCenter className="w-4 h-4" />
            </Toggle>
            <Toggle
                size={'sm'}
                onPressedChange={(e) => {
                    editor.chain().focus().setTextAlign('right').run();
                }}
                pressed={editor.isActive({ textAlign: 'right' })}
            >
                <AlignRight className="w-4 h-4" />
            </Toggle>
            <Toggle
                size={'sm'}
                onPressedChange={(e) => {
                    editor.chain().focus().toggleBlockquote().run();
                }}
                pressed={editor.isActive('blockquote')}
            >
                <Quote className="w-4 h-4" />
            </Toggle>
            <Toggle
                size={'sm'}
                onPressedChange={(e) => {
                    editor.chain().focus().setCode().run();
                }}
                pressed={editor.isActive('code')}
            >
                <Code className="w-4 h-4" />
            </Toggle>
            <Toggle
                size={'sm'}
                onPressedChange={(e) => {
                    editor.chain().focus().undo().run();
                }}
                pressed={editor.isActive('undo')}
            >
                <Undo className="w-4 h-4" />
            </Toggle>
            <Toggle
                size={'sm'}
                onPressedChange={(e) => {
                    editor.chain().focus().redo().run();
                }}
                pressed={editor.isActive('redo')}
            >
                <Redo className="w-4 h-4" />
            </Toggle>
        </div>
    );
}

export default Toolbar;
