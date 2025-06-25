"use client";

import React, { useEffect, useState, useMemo } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NoteEditor from "./components/NoteEditor";
import { getNotes, saveNotes, createNote } from "./notesStorage";
import { Note } from "./types";

/**
 * PUBLIC_INTERFACE
 * Main Notes App page for listing, editing, searching, and creating notes.
 */
export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  // Sync notes to localStorage on updates
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // Filter notes by search
  const filteredNotes = useMemo(() =>
    notes.filter((n) =>
      [n.title, n.content].join(" ").toLowerCase().includes(search.toLowerCase())
    ), [notes, search]
  );

  // Current note
  const currentNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  // Select note handler
  const handleSelect = (id: string) => {
    setSelectedId(id);
    setEditing(false);
  };

  // Create new note
  const handleCreate = () => {
    const newNote = createNote();
    setNotes([newNote, ...notes]);
    setSelectedId(newNote.id);
    setEditing(false);
  };

  // Delete note
  const handleDelete = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
      setEditing(false);
    }
  };

  // Handle editor field change
  const handleChange = (field: "title" | "content", value: string) => {
    if (!currentNote) return;
    setNotes(notes.map((n) =>
      n.id === currentNote.id ? { ...n, [field]: value, updatedAt: Date.now() } : n
    ));
    setEditing(true);
  };

  // Save changes from editor
  const handleSave = () => {
    setEditing(false);
    setNotes(prev =>
      prev.map(n =>
        n.id === selectedId
          ? { ...n, updatedAt: Date.now() }
          : n
      )
    );
  };

  // Responsive layout: Sidebar collapses to top on mobile
  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--background)]">
      <Header />
      <div className="flex-1 flex overflow-hidden max-h-[calc(100vh-72px)] sm:flex-row flex-col">
        <div className="w-full sm:w-[260px] min-h-[72px] h-fit sm:h-full border-b-2 sm:border-b-0 sm:border-r-2 border-gray-100">
          <Sidebar
            notes={filteredNotes}
            selectedId={selectedId}
            onSelect={handleSelect}
            onCreate={handleCreate}
            onDelete={handleDelete}
            search={search}
            setSearch={setSearch}
          />
        </div>
        <main className="flex-1 min-w-0 h-full bg-white">
          <NoteEditor
            note={currentNote}
            onChange={handleChange}
            onSave={handleSave}
            isEditing={editing}
          />
        </main>
      </div>
    </div>
  );
}
