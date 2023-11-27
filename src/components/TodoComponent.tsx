import { useAppDispatch } from "hooks";
import { removeUser } from "store/slices/userSlices";
import { emptyTodos } from "store/slices/todoSlices";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";
import {Button, Grid} from "@mui/material";

const TodoComponent: React.FC = () =>{
    const dispatch = useAppDispatch();
    return (
        <div style={{width:'350px', backgroundColor:'#a0a0a0', position: 'absolute', top:'20vh', marginBottom:'200px'}}>
            <NewTodoForm />
            <TodoList />
            {/* <input 
                type="button" 
                value="sign out" 
                onClick={() => {
                    dispatch( removeUser() )
                    dispatch( emptyTodos())
                }}
            /> */}
            <Grid container justifyContent="center">   
                <Button style={{marginBottom:'20px', marginTop:'20px', textAlign:'center'}}
                    variant="contained"
                    color="error"
                    onClick={() => {
                        dispatch( removeUser() )
                        dispatch( emptyTodos())
                    }} 
                    >
                    sign out
                </Button>
            </Grid>
        </div>
    );
}

export default TodoComponent;