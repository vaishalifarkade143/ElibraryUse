const { createSlice } = require("@reduxjs/toolkit");

const BooksSlice = createSlice({
    name:'books',
    initialState:{
        data:null,
        isLoading:false,
    },
    reducers:{
        viewBooks(state,action){
            state.data = action.payload;
        },
    },
});
export const {viewBooks} = BooksSlice.actions;
export default BooksSlice.reducer;