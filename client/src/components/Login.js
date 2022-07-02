import { useContext, useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { DEFAULT_LOGIN_FORM_STATE } from '../constants/loginForm';
import { updateUser } from '../actions/user';
import { useNavigate, Link } from 'react-router-dom';
import User  from '../contexts/user';
import useApi from "../hooks/useApi";


const Login = () => {

    const [loginFormState, setLoginFormState] = useState(DEFAULT_LOGIN_FORM_STATE);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useContext(User);

    const loginRequest = useApi("/api/login", "", {}, false);

    useEffect(() =>{
      if (loginRequest.data != null){
        if (loginRequest.error){
          user.updateUser(false);
        } else {
          navigate("/")
          dispatch(updateUser(loginRequest.data));
          user.updateUser(true);
        }
      }
    }, [loginRequest.data, loginRequest.error, dispatch])


    const onChange = (key) => {
        return (e) => setLoginFormState({
            ...loginFormState,
            [key]: e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        loginRequest.updateParams({
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: loginFormState.username,
            password: loginFormState.password,
          }),
        });
        
        loginRequest.perform();
    }

    return (
        <div className="container-md">
            <h2>Login Page</h2>
            <div className="row">
                <form onSubmit={onSubmit}>
                    <label className="form-label">Usuario</label>
                    <input className="form-control" id="username" type="text" value={loginFormState.username} onChange={onChange("username")} />
                    <label className="form-label">Contraseña</label>
                    <input className="form-control" id="password" type="password" value={loginFormState.password} onChange={onChange("password")} />
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
            {loginRequest.error  && (
                <div className="alert alert-danger" role="alert">{loginRequest.error}</div>
            )}

           <Link to="/signup">Registrate!</Link>
            
        </div>);
}
export default Login;