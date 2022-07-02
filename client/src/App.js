import {  useState, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import User from './contexts/user';
import AddNote from "./components/AddNote";

import { Provider } from "react-redux";

// Store
import store from "./store";

// Componente principal de la aplicación.
const App = () => {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);


  return (    
  <Provider store={store}>
    <User.Provider value={{ signedIn, updateUser: setSignedIn }}>
      <Router>
      <Fragment>
        <Routes>
          <Route exact path='/' element={<PrivateRoute><Home/></PrivateRoute>} />
          <Route exact path='/notes/add' element={<PrivateRoute><AddNote/></PrivateRoute> } />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        </Fragment>
      </Router>
      </User.Provider>
    </Provider>
  );


};

export default App;
