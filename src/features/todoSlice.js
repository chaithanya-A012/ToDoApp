import {createSlice} from '@reduxjs/toolkit';
export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todoList: [],
  },
  reducers: {
    addToDo: (state, action) => {
      state.todoList.push(action.payload);  
    },

  },
});
export const {addToDo} = todoSlice.actions;
export default todoSlice.reducer;