

// const { createSlice } = require("@reduxjs/toolkit");

// const BookhistorySlice = createSlice({
//     name:'bookhis',
//     initialState:{
//         data:[],
//         isLoading:false,
//     },
//     reducers:{
//         historyBooks(state,action){
//             state.data.push(action.payload);
//         },
//         // Add a new reducer to update the subscription status of a book
//         updateSubscription(state, action) {
//             // Assuming the payload includes the ISBN of the book and a boolean indicating the subscription status
//             const { isbn, isSubscribed } = action.payload;

//             // Find the book by ISBN in the data array
//             const book = state.data.find((book) => book.isbn === isbn);

//             // Update the subscription status of the book
//             if (book) {
//                 book.isSubscribed = isSubscribed;
//             }
//         },
//     },
// });
    
// export const {historyBooks,updateSubscription} = BookhistorySlice.actions;
// export default BookhistorySlice.reducer;