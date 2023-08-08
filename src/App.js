import './App.css';
import Signin from './components/SignIn/Signin';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const changeEmail = (event) => {
    setEmail(event.target.value);
  }

  const changeLogin = (value) => {
    setLogin(value);
  }

  const changePassword = (event) => {
    setPassword(event.target.value);
  }

  const router = createBrowserRouter([
    {path: "/", element: <Signin email={email} password={password} changeEmail={changeEmail} changeLogin={changeLogin} changePassword={changePassword}/>},
    {path: "/home", element: <Dashboard login={login}/>},
  ])

  return (
    // <RouterProvider router={router} />
    <Dashboard/>
  );
}

export default App;
