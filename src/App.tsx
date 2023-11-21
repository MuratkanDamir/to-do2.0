import TodoComponent from 'components/TodoComponent';
import { useAppDispatch } from 'hooks';
import RegisterPage from 'pages/RegisterPage';
import React, { useEffect } from 'react';
import { fetchTodos } from 'store/slices/todoSlices';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
      dispatch(fetchTodos());
    }, [dispatch]);  
    
    return (


    <div style={{padding:'20px'}}>
      <TodoComponent />
      {/* <RegisterPage /> */}
    </div>
  );
}

export default App;
