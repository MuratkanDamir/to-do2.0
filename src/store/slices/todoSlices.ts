import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from 'firebaseApp';
import { collection, query, where, getDocs, addDoc, doc, deleteDoc, updateDoc} from "firebase/firestore";
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import {RootState} from 'store/index';

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
    async function(text: string, {dispatch}){
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

                dispatch( addTodo(todo) );
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

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id:string, {dispatch}){ 
        try{
            const userQuery = query(collection(db, 'users'), where('userId', '==', userId));
            const userQuerySnapshot = await getDocs(userQuery);
            const userDoc = userQuerySnapshot.docs[0];

            const todoQuery = query(collection(userDoc.ref, 'todos'), where('id', '==', id));
            const todoQuerySnapshot = await getDocs(todoQuery);
            const todoDoc = todoQuerySnapshot.docs[0];

            await deleteDoc(todoDoc.ref);
            dispatch( removeTodo(id) );
            console.log('Document successfully deleted!');

        }catch(error){
            console.error('Error removing document: ', error);
        }
    }
)

export const toogleCompletedStatus = createAsyncThunk(
    'todos/toogleCompletedStatus',
    async function(id: string, { getState, dispatch}){
        try{
            const { todos } = getState() as RootState;
            const todo: Todo| undefined = todos.list.find(todo => todo.id === id);

            const userQuery = query(collection(db, 'users'), where('userId', '==', userId));
            const userQuerySnapshot = await getDocs(userQuery);
            const userDoc = userQuerySnapshot.docs[0];

            const todoQuery = query(collection(userDoc.ref, 'todos'), where('id', '==', id));
            const todoQuerySnapshot = await getDocs(todoQuery);
            const todoDoc = todoQuerySnapshot.docs[0];

            if (todo !== undefined) {
                await updateDoc(todoDoc.ref, {
                    completed: !todo.completed,
                });
                dispatch( toogleComplete(id) );
                console.log('Document successfully updated!');
            } else {
                console.error('Todo is undefined.');
            }
            
        }catch(error){
            console.error('Error updating document: ', error);
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
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.list = action.payload;
        })
    },
})

const {addTodo, removeTodo, toogleComplete} = todoSlices.actions;

export default todoSlices.reducer;