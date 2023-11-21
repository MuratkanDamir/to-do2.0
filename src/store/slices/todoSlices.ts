import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from 'firebaseApp';
import { collection, query, where, getDocs , limit} from "firebase/firestore";
import { DocumentData } from 'firebase/firestore';
import { QueryDocumentSnapshot } from 'firebase/firestore';


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
    ],
}


const userId = '1'; // Замените на фактический идентификатор пользователя

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function () {
        const usersCollectionRef = collection(db, 'users');
        const userQuery = query(usersCollectionRef, where('userId', '==', userId));
        const userQuerySnapshot = await getDocs(userQuery);

        if (!userQuerySnapshot.empty) {
            const userDoc = userQuerySnapshot.docs[0];
            const todosCollectionRef = collection(userDoc.ref, 'todos');
            const todosQuerySnapshot = await getDocs(todosCollectionRef);

            const todos: Todo[] = [];

            todosQuerySnapshot.forEach((todoDoc: QueryDocumentSnapshot<DocumentData>) => {
                // Добавьте проверку на существование, если необходимо
                if (todoDoc.exists()) {
                    const todoData = todoDoc.data() as Todo; // Приводим данные к типу Todo
                    todos.push({
                        ...todoData, // Spread properties from todoData
                    });
                }
            });
            return todos; // Возвращает данные для использования в payload
        } else {
            console.log('User with userId', userId, 'not found.');
            return []; // Возвращаем пустой массив в случае отсутствия данных
        }
    }
);


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
            state.list = state.list.filter((todo: Todo) =>{
                return todo.id !== action.payload;
            })
        },
        toogleComplete(state, action: PayloadAction<string>){
            state.list.map((todo:Todo) =>{
                return todo.id == action.payload? todo.completed =  !todo.completed:todo
            })
        },
    },
    // extraReducers: {
    //     [fetchTodos.fulfilled]:() =>{}
    // },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.list = action.payload;
        })
    },
})

export const {addTodo, removeTodo, toogleComplete} = todoSlices.actions;

export default todoSlices.reducer;