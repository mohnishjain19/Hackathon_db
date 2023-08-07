import logo from './logo.svg';
import './App.css';
import Signin from './components/SignIn/Signin';
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (event) => {
    setEmail(event.target.value);
  }

  const submitForm = (event) => {
    // to do
  }

  return (
    <div className="App">
      <Signin email={email} password={password} changeEmail={changeEmail} submitForm={submitForm}/>
    </div>
  );
}

export default App;
