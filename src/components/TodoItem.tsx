import { useAppDispatch } from "hooks";
import { toogleComplete } from "store/slices/todoSlices";
import { removeTodo } from "store/slices/todoSlices";
import { Checkbox , IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoItemProps{
    id: string,
    title: string,
    completed: boolean,
};

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
    const dispatch = useAppDispatch()
    return(
        <div style={{display:'flex', alignItems:'start', justifyContent: 'space-between', padding:'10px', }}>
            <div style={{display:'flex', alignItems:'start'}}>
                <Checkbox
                    checked={completed}
                    onChange = {() => dispatch(toogleComplete(id))}
                    color="success" 
                />
                {completed? (<p style={{width:'250px', overflowWrap: 'break-word' , paddingTop:'7px'}}><s>{title}</s></p>): (<p style={{width:'250px', overflowWrap: 'break-word' , paddingTop:'7px'}}>{title}</p>)}
            </div>
            <IconButton style={{marginRight:'25px', marginTop: '4px'}} aria-label="delete" size="small" onClick={() => dispatch(removeTodo(id))}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        </div>
    );
};

export default TodoItem;