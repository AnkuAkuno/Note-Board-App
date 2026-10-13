import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import NoteForm from "./components/NoteForm"
import NoteCard from "./components/NoteCard"
import FilterSection from "./components/FilterSection"

function App() {

  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [activeTab, setActiveTab] = useState('board')
  const [notes, setNotes] = useState(() => {
  const savedNotes = localStorage.getItem('TASK_BOARD_NOTE')
    return savedNotes ? JSON.parse(savedNotes) : []
  })

  
  useEffect (() => {
    localStorage.setItem('TASK_BOARD_NOTE', JSON.stringify(notes))  
  }, [notes])

  const handleAddNote = (newNote) => {
    setNotes([newNote, ...notes])
    alert('Catatan berhasil ditambahkan!')
    setActiveTab('board')
  }

const handleToggleTodo = (noteId, todoId) => {
  setNotes((currentNotes) =>
    currentNotes.map((note) =>
      note.id !== noteId
        ? note
        : {
            ...note,
            todos: note.todos.map((todo) =>
              todo.id === todoId
                ? { ...todo, completed: !todo.completed }
                : todo
            ),
          }
    )
  )
}

const handeDeleteNote = (id) => {
  setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id))

}

const filteredNotes = notes
  .filter((note) => {
    if (filterType === 'note') return note.type === 'note'
    if (filterType === 'todo') return note.type === 'todo'
    return true //jika 'all'
  })

  .sort((a, b) => {
    if (sortBy === 'oldest') return a.id - b.id
    if (sortBy === 'alphabetical') return a.title.localeCompare(b.title)
    return b.id - a.id //default 'newest'
  })

// Fungsi untuk merubah urutan kartu saat di-drag & drop
const handleReorderNotes = (draggedId, targetId) => {
  setNotes((currentNotes) => {
    const draggedIndex = currentNotes.findIndex((n) => n.id === draggedId)
    const targetIndex = currentNotes.findIndex((n) => n.id === targetId)

    if (draggedIndex === -1 || targetIndex === -1) return currentNotes

    const updatedNotes = [...currentNotes]
    // Ambil kartu yang di-drag dan selipkan ke posisi baru
    const [draggedItem] = updatedNotes.splice(draggedIndex, 1)
    const insertIndex = draggedIndex < targetIndex ? targetIndex - 1 : targetIndex
    updatedNotes.splice(insertIndex, 0, draggedItem)

    return updatedNotes
  })
}

  return (
    <div>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">

        {activeTab === 'board' && (
          <div >
            <div className="board-header">
              
              <h2 className="board-title">Note Board</h2>
              <button className="btn-quick-add" onClick={() => setActiveTab('note')}>
                + Add Note
              </button>

            </div>

             {notes.length === 0 ? (
              <p className="empty-state">Belum Ada Catatan! Silahkan buat di menu NOTE !!</p>
             ) : (
              <div className="board-grid">
                {notes.map((note) => (
                  <NoteCard key={note.id} 
                            note={note} 
                            onToggleTodo={handleToggleTodo}
                            onDelete={handeDeleteNote}
                            onReorder={handleReorderNotes} />
                ))}
              </div>
             )}
          </div>
        )}

        {activeTab === 'note' && <NoteForm onAddNote={handleAddNote} />}
        {activeTab === 'filter' && (
          <div>
            <FilterSection
            filterType={filterType}
            setFilterType={setFilterType}
            sortBy={sortBy}
            setSortBy={setSortBy}
            />

            <div className="board-grid">
              {filteredNotes.map((note) => (
                <NoteCard
                key={note.id}
                note={note}
                onToggleTodo={handleToggleTodo}
                onDelete={handeDeleteNote}
                />
              ))}
            </div>
          </div>
        )}
        {activeTab === 'about' && 
        <div className="about-container">
          <div className="about-content">
            <p>Copyright &copy; 2026 Anku Akuno</p>
            <p>Made in: September, 2026</p>
            <p> Latest Update: October, 2026</p>
            <p>All rights reserved. Please do not copy, use, or redistribute</p>
            <p>any part of this website without permission.</p>
          </div>
        </div> }
      </main>
    </div>
  )
}

export default App