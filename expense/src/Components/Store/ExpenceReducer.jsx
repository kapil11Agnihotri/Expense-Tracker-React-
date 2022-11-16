import { createSlice } from "@reduxjs/toolkit";

const expenseSlice=createSlice({
    name:'expense',
    initialState:{
        expenses:[],
       // totalAmount:0,
      changed:false
    },
    reducers:{
        replaceExpense(state,action){
            console.log(action.payload)
             state.expenses=action.payload
         
        },
          addExpense(state,action){
            state.expenses.push(action.payload)
            state.changed=true;
          },
          deleteExpenses(state,action){
            console.log(action.payload)
            let array=state.expenses.splice(action.payload,1)
            console.log(array)
            
            state.changed=true;
          }
    }
})

export const expenseActions=expenseSlice.actions;

export default expenseSlice.reducer;