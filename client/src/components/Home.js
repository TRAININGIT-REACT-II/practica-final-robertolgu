import { useSelector } from 'react-redux';
import { getUsername, getUserToken } from '../selectors/user';
import useApi from '../hooks/useApi';
import NoteList from './NoteList';
import Loader from './Loader';
import { Link } from 'react-router-dom'

const Home = () => {


    const username = useSelector((state) => getUsername(state));
    const token = useSelector((state) => getUserToken(state));

    const notesRequest = useApi("/api/notes", token);

    return (
        <div className="container-md">
            <h1>NOTAS</h1>
            <h3>Lista de notas de {username} : </h3>
            {notesRequest.data && notesRequest.data.length > 0 ? (
                <NoteList notes={notesRequest.data} />
            ) : (
                <Loader />
            )}
            <Link to="/notes/add">Añadir Nota</Link>
        </div>
    );

}

export default Home;