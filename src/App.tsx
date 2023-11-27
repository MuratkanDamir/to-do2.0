import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import React from 'react';
import {Routes, Route} from 'react-router-dom';

const App: React.FC = () => {
    return (
      <div style={{minHeight:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>        
      </div>

  );
}

export default App;
