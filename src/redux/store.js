const {configureStore} = require("@reduxjs/toolkit");
import BookReducer from './slice/BooksDetailSlice'
export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
    reducer:{
       book:BookReducer,
    },
});