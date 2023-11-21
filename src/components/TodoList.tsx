import {useAppSelector} from 'hooks';
import TodoItem from 'components/TodoItem';

const TodoList: React.FC = () => {
    const todos = useAppSelector((state) => state.todos.list);
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