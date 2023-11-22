import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from 'firebaseApp';
import { collection, query, getDocs, getDoc, Timestamp, doc, deleteDoc, updateDoc, setDoc, orderBy} from "firebase/firestore";
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import {RootState} from 'store/index';
type Todo = {
    id: string;
    title : string;
    createdAt: string;
    completed: boolean;
}
type TodoStates = {
    list: Todo[]
}
const initialState: TodoStates = {
    list: [
    ],
}

const userId = '4mQyg3Kc7gEuYW0nKH2h';
const userDoc = doc(collection(db, 'users'),userId);

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function () {
        try{
            const todosQuerySnapshot = await getDocs(query(collection(userDoc, 'todos'), orderBy("createdAt")));

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
        }catch(error){
            console.log("Error fetch Todos:", error);
            return [];
        }
    }
);

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function(text: string, {dispatch}){
        try {
            const newDocRef = doc( collection(userDoc, 'todos') )
            
            const todo: Todo = {
              id: newDocRef.id,
              title: text,
              createdAt: Timestamp.now().toDate().toISOString(),
              completed: false,
            };
            // Add a new todo document to the 'todos' subcollection
            await setDoc(newDocRef, todo);
            dispatch( addTodo(todo) );
            console.log('Task added');
        } catch (error) {
            console.error('Error adding todo:', error);
        }        
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id:string, {dispatch}){ 
        try{
            const todoDoc = doc(collection(userDoc, 'todos'), id);

            await deleteDoc(todoDoc);
            dispatch( removeTodo(id) );
            console.log('Document successfully deleted!');

        }catch(error){
            console.error('Error removing document: ', error);
        }
    }
)

// export const toogleCompletedStatus = createAsyncThunk(
//     'todos/toogleCompletedStatus',
//     async function(params: {id: string, completed: boolean}, { dispatch }){
//         try{
//             const { id, completed } = params;

//             const todoDoc = doc(collection(userDoc, 'todos'), id);
//             const todoSnapshot = await getDoc(todoDoc);

//             if (todoSnapshot.exists()) {
//                 const c = todoSnapshot.data().completed;
//                 await updateDoc(todoDoc, {
//                     completed: !c,
//                 });
//                 dispatch( toogleComplete(id) );
//                 console.log('Document successfully updated!');
//             }else{
//                 throw new Error("document don't exist");
//             }
            

//         }catch(error){
//             console.error('Error updating document: ', error);
//         }    
//     }
// )
export const toogleCompletedStatus = createAsyncThunk(
    'todos/toogleCompletedStatus',
    async function(id: string, { dispatch , getState}){
        try{
            
            const state = getState() as RootState; // Приводим тип состояния к корневому состоянию вашего приложения
            const todo = state.todos.list.find((todo) => todo.id === id);
      
            if (todo !== undefined) {
              const todoDoc = doc(collection(userDoc, 'todos'), id);
      
              await updateDoc(todoDoc, {
                completed: !todo.completed,
              });
      
              dispatch(toogleComplete(id));
              console.log('Document successfully updated!');
            } else {
              throw new Error('Todo is undefined.');
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
                return todo.id === action.payload? todo.completed =  !todo.completed:todo
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