import { configureStore } from '@reduxjs/toolkit';
import todoReducer from 'store/slices/todoSlices';
import userReducer from 'store/slices/userSlices';

const store = configureStore({
    reducer:{
        todos: todoReducer,
        user: userReducer,
    }
});

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;