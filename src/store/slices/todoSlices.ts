import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from 'firebaseApp';
import { collection, query, getDocs, getDoc, Timestamp, doc, deleteDoc, updateDoc, setDoc, orderBy} from "firebase/firestore";
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import {RootState} from 'store/index';
import { useAuth } from "hooks";
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

// const userId: string | null= useAuth().id;
// const userDoc = doc(collection(db, 'users'),userId);

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_,{getState}) {
        try{
            const state = getState() as RootState; // Приводим тип состояния к корневому состоянию вашего приложения
            const userId: string | null = state.user.id;
            if( userId !== null ){
                const userDoc = doc(collection(db, 'users'),userId);
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
            }else{
                throw new Error("userId is null");
            }
        }catch(error){
            console.log("Error fetch Todos:", error);
            return [];
        }
    }
);

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function(text: string, {dispatch, getState}){
        try {
            const state = getState() as RootState; // Приводим тип состояния к корневому состоянию вашего приложения
            const userId: string | null = state.user.id;
            if( userId !== null ){
                const userDoc = doc(collection(db, 'users'),userId);
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
            }else{
                throw new Error("UserId is null");
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }        
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id:string, {dispatch, getState}){ 
        try{
            const state = getState() as RootState; // Приводим тип состояния к корневому состоянию вашего приложения
            const userId: string | null = state.user.id;
            if( userId !== null ){
                const userDoc = doc(collection(db, 'users'),userId);
                const todoDoc = doc(collection(userDoc, 'todos'), id);

                await deleteDoc(todoDoc);
                dispatch( removeTodo(id) );
                console.log('Document successfully deleted!');
            }else{
                throw new Error("userId is null");
            }

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
            const userId: string | null = state.user.id;
            if( userId !== null ){
                const userDoc = doc(collection(db, 'users'), userId);
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
            }else{
                throw new Error("userId is null");
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
        emptyTodos(state){
            state.list = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.list = action.payload;
        })
    },
})

export const {addTodo, removeTodo, toogleComplete, emptyTodos} = todoSlices.actions;

export default todoSlices.reducer;