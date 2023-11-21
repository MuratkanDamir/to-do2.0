import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";

const TodoComponent: React.FC = () =>{
    return (
        <div style={{width:'350px', backgroundColor:'#a0a0a0', paddingTop:'10px'}}>
            <NewTodoForm />
            <TodoList />
        </div>
    );
}

export default TodoComponent;