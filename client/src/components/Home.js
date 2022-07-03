import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsername, getUserToken } from '../selectors/user';
import useApi from '../hooks/useApi';
import NoteList from './NoteList';
import { Link, useNavigate } from 'react-router-dom'
import { addAllNotes } from '../actions/note';
import { getNotes } from '../selectors/note';
import ErrorBoundary from './ErrorBoundary';

const Home = () => {
    const username = useSelector((state) => getUsername(state));
    const token = useSelector((state) => getUserToken(state));
    const notes = useSelector((state) => getNotes(state));
    const navigate = useNavigate();

    const notesRequest = useApi("/api/notes", token);

    const dispatch = useDispatch();

    useEffect(() =>{
        if (notesRequest.data != null){
          if (!notesRequest.error){
            dispatch(addAllNotes(notesRequest.data));
          }
        }
      }, [notesRequest.data, notesRequest.error, dispatch])

    const onReload = () => {
        navigate("/");
    }

    return (
        <div className="container-md">
            <h1>NOTAS</h1>
            <h3>Lista de notas de {username} : </h3>
            <ErrorBoundary message="Error al cargar las notas" onReset={onReload}>
                {notes && notes.length > 0 ? (
                    <NoteList notes={notes} />
                ) : (
                        <p>Niguna nota para mostrar.</p>
                )}
            </ErrorBoundary>
            <Link to="/notes/add">Añadir Nota</Link>
        </div>
    );

}

export default Home;