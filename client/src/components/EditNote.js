import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useApi from "../hooks/useApi";
import { useSelector } from "react-redux/es/exports";
import { getUserToken } from "../selectors/user";



const EditNote = () => {
    const [noteDetail, setNoteDetail] = useState(null);
    const params = useParams();
    const token = useSelector((state) => getUserToken(state));
    const navigate = useNavigate();

    const noteDetailRequest = useApi("/api/notes/"+params.id, token);
    const editNoteRequest = useApi("/api/notes/"+params.id, token, {}, false);

    const onChange = (key) => {
        return (e) => setNoteDetail({
            ...noteDetail,
            [key]: e.target.value
        });
    }

    useEffect(() =>{
        if (noteDetailRequest.data != null){
          if (!noteDetailRequest.error){
            setNoteDetail(noteDetailRequest.data);
          }
        }
      }, [noteDetailRequest.data, noteDetailRequest.error, params]);


      
    useEffect(() =>{
        if (editNoteRequest.data != null){
            navigate("/")
        }
      }, [editNoteRequest.data, editNoteRequest.error])


    const onSubmit = (e) => {
        e.preventDefault();

        editNoteRequest.updateParams({
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: noteDetail.title,
            content: noteDetail.content
          }),
        });
        
        editNoteRequest.perform();
    }

    return (<div className="container-md">
            <h2>Editar Nota</h2>
            { noteDetail != null ? (               
                    <div className="row">
                        <form onSubmit={onSubmit}>
                            <label className="form-label">Titulo Nota</label>
                            <input className="form-control" id="title" type="text" value={noteDetail.title} onChange={onChange("title")} />
                            <label className="form-label">Contenido</label>
                            <input className="form-control" id="content" type="text" value={noteDetail.content} onChange={onChange("content")} />
                            <button className="btn btn-primary">Guardar</button>
                        </form>
                    </div>
                ) : (
                    <p>Nada que mostrar</p>
                )
            }
        </div> );
}

export default EditNote;