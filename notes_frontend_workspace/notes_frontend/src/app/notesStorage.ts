import { Note } from './types';

const NOTES_KEY = 'notes_app_items';

/**
 * PUBLIC_INTERFACE
 * Get all notes from localStorage, sorted by updatedAt desc.
 */
export function getNotes(): Note[] {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(NOTES_KEY);
  const notes: Note[] = raw ? JSON.parse(raw) : [];
  return notes.sort((a, b) => b.updatedAt - a.updatedAt);
}

/**
 * PUBLIC_INTERFACE
 * Save notes array to localStorage.
 */
export function saveNotes(notes: Note[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

/**
 * PUBLIC_INTERFACE
 * Create a new note and return it.
 */
export function createNote(): Note {
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    title: "Untitled Note",
    content: "",
    createdAt: now,
    updatedAt: now
  };
}
