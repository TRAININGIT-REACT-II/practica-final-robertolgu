
const NoteList = ({ notes }) => {

    return (
        <div>
            <ul className="list-group">
            {notes.map((note, i) => (
                <li
                className="list-group-item"
                key={i}
                >
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.content}</p>
                        <a href="#" className="card-link">Editar</a>
                        <a href="#" className="card-link">Eliminar</a>
                    </div>
                </div>
                </li>
            ))}
            </ul>
        </div>
    );
}

export default NoteList;