import React, { useContext } from "react";
import AuthContext from "../Store/AuthContext";
import classes from "./ExpenseList.module.css";

const ExpenseList = (props) => {
  const ctx = useContext(AuthContext);

  return (
    <div className={classes.expense}>
      <h3>{props.amount}</h3>
      <h3>{props.description}</h3>
      <h3>{props.category}</h3>
      <button style={{ color: "black" }} onClick={() => ctx.remove(props.id)}>
        Edit
      </button>
      <button style={{ color: "red" }} onClick={() => ctx.remove(props.id)}>
        Delete
      </button>
    </div>
  );
};

export default ExpenseList;
