import { useState } from "react";

function NoteForm({onAddNote}) {

    //State For Swtiching form type
    const [formMode, setFormMode]= useState('note')

    //state for input form
    const [title, setTitle]= useState('')
    const [content, setContent]= useState('') //for Note form

    //state for To-Do list of task (array)
    const [todoInput, setTodoInput]= useState('')
    const [todoItems, setTodoItems]= useState([])

    //State for customization of the sticky note
    const [color, setColor] = useState('#fff9c4') //warna default

    //function for adding new task on To-Do List 
    const handleAddTodoItem = (e) => {
        e.preventDefault()
        if(!todoInput.trim()) return
        setTodoItems([...todoItems, {id: Date.now(), text: todoInput, completed: false }])
        setTodoInput('')
    }

    //function to delete the items in To-Do-List
    const handleRemoveTodoItems = (id) => {
        setTodoItems(todoItems.filter((item) => item.id !== id))
    }


    //Function when the chooses form being submited
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!title.trim()) return alert('Judul tidak boleh kosong!')

        const newNote = {
            id: Date.now(),
            title,
            type: formMode,
            content: formMode === 'note' ? content : '',
            todos: formMode === 'todo' ? todoItems : [],
            cretaedAt: new Date().toLocaleDateString(),
            color,
        }

        onAddNote(newNote)

        //Reset form
        setTitle('')
        setContent('')
        setTodoItems([])
    }

    return (
       <div className="note-form-container">

                <h2 className="note-form-title">Create Note</h2>
            {/* switcher mode tab */}
            <div className="form-mode-tabs">


                <button 
                    type="button"
                    className={`mode-tab-btn ${formMode === 'note' ? 'active' : ''}`}
                    onClick={() => setFormMode('note')}
                >
                    Paper Note
                </button>

                <button
                    type="button"
                    className={`mode-tab-btn ${formMode === 'todo' ? 'active' : ''}`}
                    onClick={() => setFormMode('todo')}
                >
                    Paper To-Do List
                </button>
            </div>

            {/* Form Input */}
            <form onSubmit={handleSubmit} className="note-form">

                <input type="text"
                placeholder="Judul Catatan / Papan..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input-title"
                />

                {/* Note form Mode */}
                {formMode === 'note' && (

                    <textarea 
                    placeholder="Tulis catatan kamu di sini..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="form-textarea"
                    rows="5"
                    ></textarea>


                )}

                {/* To-Do List Mode */}
                {formMode === 'todo' && (

                    <div className="todo-builder-section">
                        <div className="todo-input-group">
                            <input
                            type="text"
                            placeholder="Tambah tugas baru..."
                            value={todoInput}
                            onChange={(e) => setTodoInput(e.target.value)}
                            className="todo-item-input"
                            />

                            <button type="button" onClick={handleAddTodoItem} className="btn-add-item">
                                Tambah Item
                            </button>
                        </div>

                        {/* List Sementara sebelum di submitt */}
                        <ul className="temp-todo-list">
                            {todoItems.map((item) => (
                                <li key={item.id} className="temp-todo-item">
                                    <span>• {item.text}</span>
                                    <button
                                    type="button"
                                    onClick={() => handleRemoveTodoItems(item.id)}
                                    className="btn-del-item"
                                    >
                                    X   
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* PILIHAN WARNA & FONT STICKY PAPER */}
                <div className="form-group-row">
                    <div className="form-group">
                        <label>Warna Paper:</label>
                        <div className="color-options">
                            {[
                            { label: 'Kuning', hex: '#fff9c4' },
                            { label: 'Hijau', hex: '#dbedc6' },
                            { label: 'Biru', hex: '#cce5ff' },
                            { label: 'Pink', hex: '#f8bbd0' }
                            ].map((c) => (
                                <button
                                key={c.hex}
                                type="button"
                                className={`color-btn ${color === c.hex ? 'active' : ''}`}
                                style={{backgroundColor: c.hex}}
                                onClick={() => setColor(c.hex)}
                                />
                                
                            ))}
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn-submit-note">
                    Simpan Ke Board
                </button>
            </form>
       </div> 
    )
}

export default NoteForm