import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useRef } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link2,
  ImageIcon,
  Undo2,
  Redo2,
  Code2,
} from "lucide-react";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

/**
 * RichEditor — a TipTap WYSIWYG used only inside the admin blog editor.
 * Outputs HTML, which is stored in the `posts.body` column and rendered on
 * the public blog page.
 */
export default function RichEditor({ value, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Image.configure({ HTMLAttributes: { class: "rounded-xl" } }),
      Placeholder.configure({ placeholder: "Write your story…" }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-neutral max-w-none focus:outline-none min-h-[360px] px-6 py-5",
      },
    },
  });

  if (!editor) return null;

  const addImage = async (file: File) => {
    try {
      const res = await fetch(`/api/admin/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        headers: { "Content-Type": file.type || "application/octet-stream" },
        body: file,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        editor.chain().focus().setImage({ src: data.url }).run();
      } else {
        const url = window.prompt(data.error || "Upload unavailable. Paste an image URL:");
        if (url) editor.chain().focus().setImage({ src: url }).run();
      }
    } catch {
      const url = window.prompt("Upload failed. Paste an image URL instead:");
      if (url) editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("Link URL", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const Btn = ({
    onClick,
    active,
    title,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    title: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`h-9 w-9 inline-flex items-center justify-center rounded-lg transition-colors ${
        active ? "bg-[#1A1A1A] text-white" : "text-[#555] hover:bg-[#F0F0F0]"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-2xl border border-[#ECECEC] bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-[#F2F2F2] bg-[#FCFCFC] sticky top-0 z-10">
        <Btn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={16} />
        </Btn>
        <Btn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={16} />
        </Btn>
        <div className="w-px h-6 bg-[#ECECEC] mx-1" />
        <Btn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 size={16} />
        </Btn>
        <Btn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 size={16} />
        </Btn>
        <div className="w-px h-6 bg-[#ECECEC] mx-1" />
        <Btn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={16} />
        </Btn>
        <Btn title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={16} />
        </Btn>
        <Btn title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={16} />
        </Btn>
        <Btn title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <Code2 size={16} />
        </Btn>
        <div className="w-px h-6 bg-[#ECECEC] mx-1" />
        <Btn title="Link" active={editor.isActive("link")} onClick={setLink}>
          <Link2 size={16} />
        </Btn>
        <Btn title="Image" onClick={() => fileRef.current?.click()}>
          <ImageIcon size={16} />
        </Btn>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) addImage(f);
            e.target.value = "";
          }}
        />
        <div className="w-px h-6 bg-[#ECECEC] mx-1" />
        <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 size={16} />
        </Btn>
        <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 size={16} />
        </Btn>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
