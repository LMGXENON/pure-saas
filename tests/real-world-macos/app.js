// Zenith Notes macOS Desktop Interaction Logic

const INITIAL_NOTES = [
  {
    id: 'note-1',
    title: 'Architecture Review: Q3 Runtime Engine',
    snippet: 'Discussion on memory isolation in micro-VMMs...',
    body: '<p>Discussion on memory isolation in micro-VMMs. Deterministic execution guarantees zero unexpected side effects.</p><p>Action Items:</p><ul><li>Verify memory boundary proofs</li><li>Implement SIGTERM graceful teardown</li></ul>',
    folder: 'work',
    pinned: true,
    updatedAt: '10:42 AM'
  },
  {
    id: 'note-2',
    title: 'Pure SaaS Design Guidelines',
    snippet: 'Strict enforcement of Apple HIG principles: Clarity, Deference...',
    body: '<p>Strict enforcement of Apple HIG principles: Clarity, Deference, and Depth. Eliminate generic gradient slop and use native system metrics.</p>',
    folder: 'work',
    pinned: false,
    updatedAt: 'Yesterday'
  },
  {
    id: 'note-3',
    title: 'Weekend Reading & Hardware Experiments',
    snippet: 'Exploring RISC-V FPGA implementations and local LLMs...',
    body: '<p>Exploring RISC-V FPGA implementations and running quantized local models on Apple Silicon unified memory.</p>',
    folder: 'personal',
    pinned: false,
    updatedAt: 'Oct 22'
  }
];

const state = {
  notes: [...INITIAL_NOTES],
  activeNoteId: 'note-1',
  activeFolder: 'all',
  activeFilter: 'all', // 'all' | 'pinned' | 'archive'
  searchQuery: ''
};

function renderNotesList() {
  const container = document.getElementById('notes-list');
  if (!container) return;

  const filtered = state.notes.filter(note => {
    if (state.activeFolder !== 'all' && note.folder !== state.activeFolder) return false;
    if (state.activeFilter === 'pinned' && !note.pinned) return false;
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchTitle = note.title.toLowerCase().includes(q);
      const matchSnippet = note.snippet.toLowerCase().includes(q);
      if (!matchTitle && !matchSnippet) return false;
    }
    return true;
  });

  container.innerHTML = filtered.map(note => `
    <div class="note-item ${note.id === state.activeNoteId ? 'active' : ''}" data-id="${note.id}" role="option" aria-selected="${note.id === state.activeNoteId}">
      <div class="note-title">${note.title}</div>
      <div class="note-snippet">${note.snippet}</div>
      <div class="note-date">${note.updatedAt}</div>
    </div>
  `).join('');

  container.querySelectorAll('.note-item').forEach(el => {
    el.addEventListener('click', () => {
      selectNote(el.dataset.id);
    });
  });

  // If active note was filtered out, select first available
  if (filtered.length > 0 && !filtered.some(n => n.id === state.activeNoteId)) {
    selectNote(filtered[0].id);
  } else if (filtered.length === 0) {
    renderActiveNote(null);
  } else {
    const current = state.notes.find(n => n.id === state.activeNoteId);
    renderActiveNote(current);
  }
}

function selectNote(noteId) {
  state.activeNoteId = noteId;
  const note = state.notes.find(n => n.id === noteId);
  renderActiveNote(note);

  const container = document.getElementById('notes-list');
  if (container) {
    container.querySelectorAll('.note-item').forEach(el => {
      const isSelected = el.dataset.id === noteId;
      el.classList.toggle('active', isSelected);
      el.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });
  }
}

function renderActiveNote(note) {
  const titleEl = document.getElementById('active-title');
  const metaEl = document.getElementById('active-meta');
  const bodyEl = document.getElementById('active-body');

  if (!note) {
    if (titleEl) titleEl.textContent = 'No Notes Found';
    if (metaEl) metaEl.textContent = 'No matching notes for the selected filter';
    if (bodyEl) bodyEl.innerHTML = '<p>Try clearing your search query or switching filters.</p>';
    return;
  }

  if (titleEl) titleEl.textContent = note.title;
  if (metaEl) metaEl.textContent = `Updated: ${note.updatedAt} · Folder: ${note.folder}`;
  if (bodyEl) bodyEl.innerHTML = note.body;
}

function createNewNote() {
  const newId = `note-${Date.now()}`;
  const newNote = {
    id: newId,
    title: 'Untitled Note',
    snippet: 'Start typing here...',
    body: '<p>Start typing your new note contents here...</p>',
    folder: state.activeFolder === 'all' ? 'work' : state.activeFolder,
    pinned: false,
    updatedAt: 'Just now'
  };
  state.notes.unshift(newNote);
  state.activeNoteId = newId;
  renderNotesList();
  return newNote;
}

function initApp() {
  // Segmented control listeners
  const segBtns = document.querySelectorAll('.segmented-control .segment-btn');
  segBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      segBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      state.activeFilter = btn.dataset.filter || 'all';
      renderNotesList();
    });
  });

  // Search input listener
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim();
      renderNotesList();
    });
  }

  // New Note button
  const newNoteBtn = document.getElementById('btn-new-note');
  if (newNoteBtn) {
    newNoteBtn.addEventListener('click', () => {
      createNewNote();
    });
  }

  // Keyboard shortcut listener (Cmd+N, Cmd+F)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
      e.preventDefault();
      createNewNote();
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
  });

  renderNotesList();

  // Export API for tests
  if (typeof window !== 'undefined') {
    window.__ZENITH_API__ = {
      state,
      renderNotesList,
      selectNote,
      createNewNote
    };
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}
