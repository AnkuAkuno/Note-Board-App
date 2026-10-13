function NoteCard ({note, onToggleTodo, onDelete, onReorder}) {

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', note.id.toString())
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }

    const handleDrop = (e) => {
        e.preventDefault()
        if (!onReorder) return

        const draggedId= Number(e.dataTransfer.getData('text/plain'))
        if (draggedId !== note.id) {
            onReorder(draggedId, note.id)
        }
    }
    return (


        <div 
            className={`note-card${onReorder ? ' note-card-draggable' : ''}`}
            draggable={Boolean(onReorder)}
            onDragStart={onReorder ? handleDragStart : undefined}
            onDragOver={onReorder ? handleDragOver : undefined}
            onDrop={onReorder ? handleDrop : undefined}
            style={{
                backgroundColor: note.color || '#fff9c4',
                fontFamily: note.fontStyle || 'sans-serif'
            }}
            >
            <div className="note-card-header">
                <span className="note-type-badge">
                    {note.type === 'note' ? '📝 Note' : '☑️ To-Do' }
                </span>

                <button className="btn-delete-card" onClick={() => onDelete(note.id)}>
                    ✕
                </button>

                <span className="note-date"> {note.createdAt} </span>
            </div>

            <h3 className="note-title"> {note.title}</h3>

            {note.type === 'note' && (
                <p className="note-content"> {note.content} </p>
            )}

            {note.type === 'todo' && (
                <ul className="note-todo-list">
                    {note.todos.map((todo) => (
                        <li key={todo.id} className="note-todo-item">
                            <input type="checkbox" checked={todo.completed} onChange={() => onToggleTodo(note.id, todo.id)} />
                            <span className={todo.completed ? 'completed' : ''}>
                                {todo.text}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default NoteCard