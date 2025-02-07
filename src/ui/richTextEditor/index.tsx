"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";

import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Youtube from "@tiptap/extension-youtube";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import Placeholder from "@tiptap/extension-placeholder";
import OrderedList from "@tiptap/extension-ordered-list";
import CharacterCount from "@tiptap/extension-character-count";

import ToolBar from "./ToolBar";
import CharacterCounter from "./CharacterCounter";

export default function RichTextEditor({
  limit,
  content,
  onChange,
}: {
  limit: number;
  content: string;
  onChange: (query: string) => void;
}) {
  const editor: Editor | null = useEditor({
    extensions: [
      StarterKit.configure(),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [2, 3, 4],
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-3",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-3",
        },
      }),
      Youtube.configure({
        nocookie: true,
      }),
      CharacterCount.configure({
        limit: limit,
      }),
      Placeholder.configure({
        placeholder: "Write Your Post Content …",
        // Use different placeholders depending on the node type:
        // placeholder: ({ node }) => {
        //   if (node.type.name === "heading") return "What’s the title?";
        //   return "Can you add some further context?";
        // },
      }),
      Link,
      Underline,
      Highlight,
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "min-h-[180px] border rounded-md rounded-t-none bg-slate-50 py-2 px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-500",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
      <CharacterCounter editor={editor} limit={limit} />
    </div>
  );
}
