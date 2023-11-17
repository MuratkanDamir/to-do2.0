import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
    id: string;
    title : string;
    completed: boolean;
}

type TodoStates = {
    list: Todo[]
}


const initialState: TodoStates = {
    list: [
        {
            id:"121212",
            title: "example1",
            completed: false,
        },
        {
            id:"555555",
            title: "example2",
            completed: false,
        }
    ],
}

const todoSlices = createSlice({
    name: "todos",
    initialState,
    reducers:{
        addTodo(state, action: PayloadAction<string>){
            state.list.push({
                id: new Date().toISOString(),
                title: action.payload,
                completed: false,
            })
        },
        removeTodo(state, action: PayloadAction<string>){
            state.list.filter((todo: Todo) =>{
                return todo.id !== action.payload;
            })
        },
        toogleComplete(state, action: PayloadAction<string>){
            state.list.map((todo:Todo) =>{
                return todo.id == action.payload? todo.completed =  !todo.completed:todo
            })
        },
    }
})

export const {addTodo, removeTodo, toogleComplete} = todoSlices.actions;

export default todoSlices.reducer;