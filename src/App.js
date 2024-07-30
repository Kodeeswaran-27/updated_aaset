import './App.css';
import React, { useEffect } from 'react';  
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './Components/LoginForm/LoginForm';
import Main from './Components/Main/Main'

function App() {
  // useEffect(() => {  
  //   document.title = "Asset Prediction";  
  // }, []);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/main/*" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;