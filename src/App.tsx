import TodoComponent from 'components/TodoComponent';
import RegisterPage from 'pages/RegisterPage';
import React from 'react';

const App: React.FC = () => {
    return (
    <div style={{padding:'20px'}}>
      <TodoComponent />
      {/* <RegisterPage /> */}
    </div>
  );
}

export default App;
