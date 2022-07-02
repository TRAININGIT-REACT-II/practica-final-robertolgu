import { useState, useContext, useEffect} from "react";
import { DEFAULT_SIGNUP_FORM_STATE } from '../constants/signUpForm';
import { useDispatch } from 'react-redux';
import { updateUser } from '../actions/user';
import { useNavigate } from 'react-router-dom';

import User from '../contexts/user';
import useApi from "../hooks/useApi";

const SignUp = () => {

    const [signUpFormState, setSignUpFormState] = useState(DEFAULT_SIGNUP_FORM_STATE);
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useContext(User);

    const registerRequest = useApi("/api/register", "", {}, false);

    useEffect(() =>{
      if (registerRequest.data != null){
        if (registerRequest.error){
          user.updateUser(false);
        } else {
          navigate("/")
          dispatch(updateUser(registerRequest.data));
          user.updateUser(true);
        }
      }
    }, [registerRequest.data, registerRequest.error, dispatch])

    const onChange = (key) => {
        return (e) => setSignUpFormState({
            ...signUpFormState,
            [key]: e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        
        registerRequest.updateParams({
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: signUpFormState.username,
            password: signUpFormState.password,
          }),
        });
        
        registerRequest.perform();
    }


    return (
        <div className="container-md">
            <h2>Sign Up Page</h2>
            <div className="row">
                <form onSubmit={onSubmit}>
                    <label className="form-label">Usuario</label>
                    <input className="form-control" id="username" type="text" value={signUpFormState.username} onChange={onChange("username")} />
                    <label className="form-label">Contraseña</label>
                    <input className="form-control" id="password" type="password" value={signUpFormState.password} onChange={onChange("password")} />
                    <button className="btn btn-primary">Registro</button>
                </form>
            </div>
            {error.length > 0 && (
                <div className="alert alert-danger" role="alert">{error}</div>
            )}
            {msg.length > 0 && (
                <div className="alert alert-success" role="alert">{msg}</div>
            )}
            
        </div>);



}
export default SignUp;