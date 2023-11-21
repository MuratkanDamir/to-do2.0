import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from 'firebaseApp';
import { collection, query, where, getDocs, addDoc} from "firebase/firestore";
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { text } from "stream/consumers";
import { useAppDispatch } from "hooks";


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
        const userQuery = query(collection(db, 'users'), where('userId', '==', userId));
        const userQuerySnapshot = await getDocs(userQuery);

        if (!userQuerySnapshot.empty) {
            const userDoc = userQuerySnapshot.docs[0];
            const todosQuerySnapshot = await getDocs(collection(userDoc.ref, 'todos'));

            const todos: Todo[] = [];

            todosQuerySnapshot.forEach((todoDoc: QueryDocumentSnapshot<DocumentData>) => {
                if (todoDoc.exists()) {
                    const todoData = todoDoc.data() as Todo; // Приводим данные к типу Todo
                    todos.push({
                        ...todoData,
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

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function(text: string){
        try {
            const userQuery = query(collection(db, 'users'), where('userId', '==', userId));
            const userQuerySnapshot = await getDocs(userQuery);

            if (!userQuerySnapshot.empty) {
                const userDoc = userQuerySnapshot.docs[0];
                const todosCollectionRef = collection(userDoc.ref, 'todos');
                const todosQuerySnapshot = await getDocs(todosCollectionRef);

                // Get the number of documents in the todos collection
                const numberOfTodos = todosQuerySnapshot.size;
                const todo: Todo = {
                    id: String(numberOfTodos+1),
                    title: text,
                    completed: false,
                }
                // Add a new todo document to the 'todos' subcollection
                await addDoc(todosCollectionRef, todo);

                addTodo(todo);
                console.log('Task added');
            } else {
                console.log('User with userId', userId, 'not found.');
                throw new Error('User not found');
            }
        } catch (error) {
            console.error('Error adding todo:', error);
            throw error;
        }        
    }
)

const todoSlices = createSlice({
    name: "todos",
    initialState,
    reducers:{
        addTodo(state, action: PayloadAction<Todo>){
            state.list.push(action.payload);
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