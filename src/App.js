import './App.css';
import Signin from './components/SignIn/Signin';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import useToken from './useToken';


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useToken();

  const changeEmail = (event) => {
    setEmail(event.target.value);
  }

  const submitForm = (event) => {
    // to do
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin email={email} password={password} changeEmail={changeEmail} submitForm={submitForm}/>} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
