

const { createSlice } = require("@reduxjs/toolkit");

const BookhistorySlice = createSlice({
    name:'bookhis',
    initialState:{
        data:[],
        isLoading:false,
    },
    reducers:{
        historyBooks(state,action){
            state.data = action.payload;
        },
        
    },
});
export const {historyBooks} = BookhistorySlice.actions;
export default BookhistorySlice.reducer;