
const NoteList = ({ notes }) => {

    return (
        <div>
            <ul className="list-group">
            {notes.map((note, i) => (
                <li
                key={i}
                >
                {note.title}
                </li>
            ))}
            </ul>
        </div>
    );
}

export default NoteList;