import './App.css';
import Signin from './components/SignIn/Signin';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [isManager, setIsManager] = useState(false)
  const [name, setName] = useState("")

  const changeEmail = (event) => {
    setEmail(event.target.value);
  }

  const changeLogin = (value) => {
    setLogin(value);
  }

  const changeId = (value) => {
    setId(value)
  }

  const changePassword = (event) => {
    setPassword(event.target.value);
  }

  const changeIsManager = (value) => {
    setIsManager(value)
  }

  const changeName = (value) => {
    setName(value)
  }

  const logout = () => {
    setEmail("")
    setId("")
    setPassword("")
    setLogin(false)
    setIsManager(false)
    setName("")
  }

  const router = createBrowserRouter([
    {path: "/", element: <Signin email={email} password={password} changeId={changeId} changeName={changeName} changeEmail={changeEmail} changeLogin={changeLogin} changePassword={changePassword} changeIsManager={changeIsManager}/>},
    {path: "/home", element: <Dashboard login={login} isManager={isManager} name={name} email={email} id={id} logout={logout}/>},
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
