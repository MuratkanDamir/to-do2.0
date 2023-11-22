import {useAppDispatch, useAppSelector} from 'hooks';
import TodoItem from 'components/TodoItem';
import { fetchTodos } from 'store/slices/todoSlices';
import { useEffect } from 'react';

const TodoList: React.FC = () => {
    const todos = useAppSelector((state) => state.todos.list);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTodos());
      }, [dispatch]);  

    return (
        <div>
            {
                todos.map((todo)=> (
                    <TodoItem 
                        key = {todo.id}
                        {...todo}
                    />))
            }
        </div>
    );
};

export default TodoList;