// import todoReducer from 'store/slices/todoSlices';
// import userReducer from 'store/slices/userSlices';

// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';

// import storage from 'redux-persist/lib/storage';

// const rootReducer = combineReducers({
//     user: userReducer,
// });
  


// const persistConfig = {
//     key: 'root',
//     storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//     reducer: persistReducer,
// });

// export default store;


// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import todoReducer from 'store/slices/todoSlices';
import userReducer from 'store/slices/userSlices';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
  todos: todoReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Используйте persistedReducer здесь, а не persistReducer
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
