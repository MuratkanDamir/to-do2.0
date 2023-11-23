import TodoComponent from 'components/TodoComponent';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import React from 'react';

const App: React.FC = () => {
    return (
    <div style={{padding:'20px'}}>
      {/* <TodoComponent /> */}
      <LoginPage />
      {/* <RegisterPage /> */}
    </div>
  );
}

export default App;
