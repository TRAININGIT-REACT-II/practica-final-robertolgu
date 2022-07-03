import { useState, useEffect } from "react";
import { useParams } from "react-router";
import useApi from "../hooks/useApi";
import { useSelector } from "react-redux/es/exports";
import { getUserToken } from "../selectors/user";



const NoteDetail = () => {

    const [noteDetail, setNoteDetail] = useState(null);
    const params = useParams();
    const token = useSelector((state) => getUserToken(state));

    const noteDetailRequest = useApi("/api/notes/"+params.id, token);


    useEffect(() =>{
        if (noteDetailRequest.data != null){
          if (!noteDetailRequest.error){
            setNoteDetail(noteDetailRequest.data);
          }
        }
      }, [noteDetailRequest.data, noteDetailRequest.error, params])

    return (        
        <div className="container-md">
            <h2>Detalle Nota</h2>
            {
                noteDetail != null ? (                    
                    <div className="row">
                        <label className="form-label">Titulo Nota</label>
                        <input readOnly className="form-control" id="title" type="text" value={noteDetail.title}/>
                        <label className="form-label">Contenido</label>
                        <input readOnly className="form-control" id="content" type="text" value={noteDetail.content} />
                    </div>
                ) : (
                    <p>Nada que mostrar</p>
                )
            }
            </div>
    );
}

export default NoteDetail;