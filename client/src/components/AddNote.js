import { useState, useEffect  } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { DEFAULT_NOTE_FORM_STATE }  from '../constants/noteForm';
import { getUserId, getUserToken } from '../selectors/user';
import { useNavigate } from 'react-router-dom';
import useApi from "../hooks/useApi";



const AddNote = () => {
    const [addNoteFormState, setAddNoteFormState] = useState(DEFAULT_NOTE_FORM_STATE);
    const userId = useSelector((state) => getUserId(state));
    const token = useSelector((state) => getUserToken(state));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addNoteRequest = useApi("/api/notes", token, {}, false);


    useEffect(() =>{
        if (addNoteRequest.data != null){
            navigate("/")
        }
      }, [addNoteRequest.data, addNoteRequest.error, dispatch])

    const onChange = (key) => {
        return (e) => setAddNoteFormState({
            ...addNoteFormState,
            [key]: e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        addNoteRequest.updateParams({
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: addNoteFormState.title,
            content: addNoteFormState.content,
            author: userId
          }),
        });
        
        addNoteRequest.perform();
    }

    return (
        <div className="container-md">
            <h2>Añadir Nota</h2>
            <div className="row">
                <form onSubmit={onSubmit}>
                    <label className="form-label">Titulo Nota</label>
                    <input className="form-control" id="title" type="text" value={addNoteFormState.title} onChange={onChange("title")} />
                    <label className="form-label">Contenido</label>
                    <input className="form-control" id="content" type="text" value={addNoteFormState.content} onChange={onChange("content")} />
                    <button className="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    );
}

export default AddNote;