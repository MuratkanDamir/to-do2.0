import {useAppDispatch} from 'hooks';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addNewTodo} from 'store/slices/todoSlices';
import { TextField, Button } from "@mui/material";

type IFormInput = {
    task: string;
};

const NewTodoForm: React.FC = () => {

    const dispatch = useAppDispatch();

    const {register, reset , handleSubmit} = useForm<IFormInput>()
  
    const onHandleSubmit: SubmitHandler<IFormInput> = (data) => {
        //dispatch( addTodo(data.task));
        console.log("click add button")
        dispatch(addNewTodo(data.task)) ;
        reset();
    };
    
    return(
        <div>
            <form onSubmit={handleSubmit(onHandleSubmit)} style={{display:'flex', alignItems:'center', justifyContent:'space-around'}}>
                <TextField id="standard-basic" label="enter your task..." variant="standard" {...register("task")} />
                <Button variant="contained" color="success" size="medium" type='submit'>
                    add
                </Button>
            </form>
        </div>
    );
};

export default NewTodoForm;