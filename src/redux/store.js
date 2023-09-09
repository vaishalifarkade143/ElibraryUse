const {configureStore} = require("@reduxjs/toolkit");
import BookReducer from './slice/BooksDetailSlice'
export const store = configureStore({
    reducer:{
       book:BookReducer,
    },
});