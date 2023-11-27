import Profile from "components/Profile";
import TodoComponent from "components/TodoComponent";

const TodoPage: React.FC = () =>{
    return(
        <div style={{width:'100%', minHeight:'100vh', backgroundColor: '#5B0888'}}>
            <Profile />
            <TodoComponent />
        </div>
    )
}

export default TodoPage;