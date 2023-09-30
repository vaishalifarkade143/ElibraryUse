// const { createSlice } = require("@reduxjs/toolkit");

// const BooksSlice = createSlice({
//     name:'books',
//     initialState:{
//         data:null,
//         isLoading:false,
//     },
//     reducers:{
//         viewBooks(state,action){
//             state.data = action.payload;
//         },
//     },
// });
// export const {viewBooks} = BooksSlice.actions;
// export default BooksSlice.reducer;



const { createSlice } = require("@reduxjs/toolkit");

const BooksSlice = createSlice({
    name:'books',
    initialState:{
        subscribedBooks: [], // Initial state is an empty array
        data:null,
        isLoading:false,
    },
    reducers:{
        viewBooks(state,action){
            state.data = action.payload;
        },
        subscribeToBook (state, action) {
            // Add the ISBN of the subscribed book to the state
            state.subscribedBooks.push(action.payload);
          },
          unsubscribeFromBook(state, action)  {
            // Remove the ISBN of the unsubscribed book from the state
            state.subscribedBooks = state.subscribedBooks.filter(isbn => isbn !== action.payload);
          },
    },
});
export const {viewBooks,subscribeToBook, unsubscribeFromBook } = BooksSlice.actions;
export default BooksSlice.reducer;