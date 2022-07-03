import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote } from '../actions/note';
import useApi from '../hooks/useApi';
import Modal from './Modal';
import { getUserToken } from '../selectors/user';
import { useNavigate } from 'react-router';


const NoteList = ({ notes }) => {

    const [showModal, setShowModal] = useState(false);
    const [elementIndex, setElementIndex] = useState(null);
    const [deleteElement, setDeleteElement] = useState(false);
    const token = useSelector((state) => getUserToken(state));
    const navigate = useNavigate();

    const closeModal = () => setShowModal(false);

    const dispatch = useDispatch();

    const deleteRequest = useApi("/api/notes/{id}", token, {}, false);

    useEffect(() =>{
        if (deleteElement){
          if (!deleteRequest.error){
            setDeleteElement(false);
            setShowModal(false);
            dispatch(deleteNote(elementIndex));
          }
        }
      }, [deleteElement, deleteRequest.error, elementIndex, dispatch])

    const onDelete = (noteId) => {
        setShowModal(true);
        setElementIndex(noteId);
    }

    const onAcceptModal = (elementIndex) => {;
        setDeleteElement(true);
        deleteRequest.updateParams({
            method: "DELETE"
        });

        deleteRequest.updateUrl("/api/notes/"+elementIndex);
        deleteRequest.perform();
    }

    const onEdit = (noteId) => {
         navigate("/notes/"+noteId);
    }
    const onShowNote = (noteId) => {
        // TODO
        navigate("/notes/"+noteId);
    }

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
                        <a className="card-link" onClick={() => onShowNote(note.id)}>Ver</a>
                        <a className="card-link" onClick={() => onEdit(note.id)}>Editar</a>
                        <a className="card-link" onClick={() => onDelete(note.id)}>Eliminar</a>
                    </div>
                </div>
                </li>
            ))}
            </ul>
            <Modal show={showModal} onClose={closeModal}>
                <h3>¿Desea eliminar el elemento?</h3>
                <button className="btn btn-danger" onClick={() => onAcceptModal(elementIndex)}>Eliminar</button>
                <button onClick={closeModal} className="btn btn-light">Cancelar</button>
            </Modal>
        </div>
    );
}

export default NoteList;