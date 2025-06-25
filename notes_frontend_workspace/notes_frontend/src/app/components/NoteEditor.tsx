import React, { useEffect, useRef } from "react";
import { Note } from "../types";

interface Props {
  note: Note | null;
  onChange: (field: "title" | "content", value: string) => void;
  onSave: () => void;
  isEditing: boolean;
}

const emptyStateEl = (
  <div className="h-full w-full flex items-center justify-center text-xl text-gray-300">
    Select a note or create a new one.
  </div>
);

/**
 * PUBLIC_INTERFACE
 * The editor for the note's title/content, with a save button.
 */
const NoteEditor = ({
  note,
  onChange,
  onSave,
  isEditing,
}: Props) => {
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (note?.title && titleRef.current) {
      titleRef.current.focus();
    }
  }, [note?.id]);

  if (!note) return emptyStateEl;

  return (
    <form
      onSubmit={e => { e.preventDefault(); onSave(); }}
      className="h-full flex flex-col gap-4 p-6"
      aria-label="Note editor"
    >
      <input
        ref={titleRef}
        className="text-2xl font-semibold py-2 px-2 border-b border-gray-200 focus:outline-none focus:border-[color:var(--primary)] bg-transparent"
        value={note.title}
        onChange={e => onChange("title", e.target.value)}
        placeholder="Title"
        aria-label="Note title"
        style={{
          outlineColor: "var(--primary-color)",
        }}
        required
      />
      <textarea
        className="flex-1 resize-none font-mono text-base py-2 px-2 border-b border-gray-100 focus:outline-none focus:border-[color:var(--primary)] bg-transparent min-h-[220px]"
        value={note.content}
        onChange={e => onChange("content", e.target.value)}
        placeholder="Start typing..."
        aria-label="Note content"
        style={{
          outlineColor: "var(--primary-color)",
        }}
      />
      <div className="mt-auto flex gap-3">
        <button
          type="submit"
          className={`py-2 px-5 rounded font-semibold text-white transition ${isEditing ? "bg-[color:var(--secondary)]" : "bg-[color:var(--primary)]"} hover:bg-[color:var(--accent)]`}
          style={{
            backgroundColor: isEditing ? "var(--secondary-color)" : "var(--primary-color)"
          }}
        >
          {isEditing ? "Save Changes" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default NoteEditor;
