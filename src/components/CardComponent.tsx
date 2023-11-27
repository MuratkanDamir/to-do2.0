import EditableText from "customComponents/EditableText";
import { useAppDispatch } from "hooks";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";

const CardComponent: React.FC = () =>{
    return (
        <div style={{width:'350px', backgroundColor:'#9D76C1', position: 'absolute', top:'20vh', marginBottom:'200px'}}>
            <EditableText />
            <NewTodoForm />
            <TodoList />
        </div>
    );
}

export default CardComponent;