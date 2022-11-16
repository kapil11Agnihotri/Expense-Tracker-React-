import React from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../Store/ExpenceReducer";
//import AuthContext from "../Store/AuthContext";
import classes from "./ExpenseList.module.css";

const ExpenseList = (props) => {
  console.log(props.id)
  const dispatch=useDispatch()

  const deleteHandler=()=>{
    dispatch(expenseActions.deleteExpenses(props.id))
  }

  return (
    <div className={classes.expense}>
      <h3>{props.amount}</h3>
      <h3>{props.description}</h3>
      <h3>{props.category}</h3>
      <button style={{ color: "black" }} onClick={deleteHandler}>
        Edit
      </button>
      <button style={{ color: "red" }} onClick={deleteHandler}>
        Delete
      </button>
    </div>
  );
};

export default ExpenseList;
