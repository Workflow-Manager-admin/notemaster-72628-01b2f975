import React from "react";
import { Note } from "../types";

interface Props {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  search: string;
  setSearch: (s: string) => void;
}

/**
 * PUBLIC_INTERFACE
 * Sidebar for notes navigation with search/filter, create, and note select.
 */
const Sidebar = ({
  notes,
  selectedId,
  onSelect,
  onCreate,
  onDelete,
  search,
  setSearch,
}: Props) => (
  <aside className="h-full flex flex-col bg-[#fafbff] border-r border-gray-100 min-w-[220px] w-full max-w-[300px]">
    <div className="px-3 py-2">
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search notes..."
        className="w-full px-2 py-1 rounded border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]"
        style={{ outlineColor: 'var(--primary-color)' }}
        aria-label="Search notes"
      />
    </div>
    <div className="flex-1 overflow-y-auto">
      <ul className="divide-y divide-gray-100">
        {notes.length === 0 ? (
          <li className="p-4 text-center text-gray-400">No notes found</li>
        ) : notes.map(note => (
          <li
            key={note.id}
            className={`cursor-pointer px-4 py-2 transition bg-white hover:bg-gray-50 ${selectedId === note.id ? 'bg-[color:var(--primary-bg,rgba(63,81,181,0.075))] font-semibold border-l-4 border-[color:var(--primary)]' : ''}`}
            onClick={() => onSelect(note.id)}
            tabIndex={0}
            aria-selected={selectedId === note.id}
            style={
              selectedId === note.id
                ? { borderLeft: '4px solid var(--primary-color)' }
                : {}
            }
          >
            <div className="text-base truncate">{note.title || "Untitled"}</div>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
              {new Date(note.updatedAt).toLocaleDateString()} 
              <button
                className="ml-auto text-[color:var(--accent)] hover:text-[color:var(--secondary)] px-1"
                onClick={e => { e.stopPropagation(); onDelete(note.id); }}
                title="Delete note"
                aria-label={`Delete note ${note.title || note.id}`}
              >
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    <div className="p-3">
      <button
        className="w-full py-2 px-4 bg-[color:var(--primary)] text-white font-semibold rounded transition hover:bg-[color:var(--secondary)]"
        onClick={onCreate}
        style={{
          backgroundColor: "var(--primary-color)",
        }}
        aria-label="Create new note"
      >
        + New Note
      </button>
    </div>
  </aside>
);

export default Sidebar;
