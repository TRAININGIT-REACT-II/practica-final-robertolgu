import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsername, getUserToken } from '../selectors/user';
import useApi from '../hooks/useApi';
import NoteList from './NoteList';
import { Link } from 'react-router-dom'
import { addAllNotes } from '../actions/note';
import { getNotes } from '../selectors/note';

const Home = () => {
    const username = useSelector((state) => getUsername(state));
    const token = useSelector((state) => getUserToken(state));
    const notes = useSelector((state) => getNotes(state));

    const notesRequest = useApi("/api/notes", token);

    const dispatch = useDispatch();

    useEffect(() =>{
        if (notesRequest.data != null){
          if (!notesRequest.error){
            dispatch(addAllNotes(notesRequest.data));
          }
        }
      }, [notesRequest.data, notesRequest.error, dispatch])

    return (
        <div className="container-md">
            <h1>NOTAS</h1>
            <h3>Lista de notas de {username} : </h3>
            {notes && notes.length > 0 ? (
                <NoteList notes={notes} />
            ) : (
                    <p>Niguna nota para mostrar.</p>
            )}
            <Link to="/notes/add">Añadir Nota</Link>
        </div>
    );

}

export default Home;