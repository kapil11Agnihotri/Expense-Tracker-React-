import axios from "axios";
import { expenseActions } from "./ExpenceReducer";

export const sendExpenseData = (expense) => {
  return async () => {
    const sendRequest = async () => {
      await axios.put(
        "https://expense-tracker-4e84e-default-rtdb.firebaseio.com/data.json", expense.expenses
        
      );
    };
    sendRequest();
    console.log('hello')
  };
};

export const getExpenseData = () => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await axios.get(
        "https://expense-tracker-4e84e-default-rtdb.firebaseio.com/data.json"
      );
      const data=await response.data;
      console.log(data)
      return data;
      
    };
   
    try {
        const expenseData=await getData();
        console.log(expenseData)
        dispatch(expenseActions.replaceExpense(
            expenseData || []
        ))
      } catch (error) {
        console.log(error)
      }
    
  };
};
