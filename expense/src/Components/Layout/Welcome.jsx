import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Store/AuthContext";
import "./Welcome.css";
import classes from "../Profile/Profile.module.css";
import { useState } from "react";
import ExpenseList from "./ExpenseList";

const Welcome = () => {
  const ctx = useContext(AuthContext);
  const location = useNavigate();
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const [expense, setExpense] = useState([]);

  const addExpenseHandler = (event) => {
    event.preventDefault();
    const obj = {
      enteredAmount: amountRef.current.value,
      enteredDescription: descriptionRef.current.value,
      enteredCategory: categoryRef.current.value,
    };
    console.log(obj);
    //const object=[...expense,obj]
    setExpense((prev)=>{
      return [...prev,obj]
    });
  };

  const showExpenses = expense.map((item) => {
    return (
      <ExpenseList
        key={Math.random()}
        amount={item.enteredAmount}
        description={item.enteredDescription}
        category={item.enteredCategory}
      />
    );
  });

  const logoutHandler = () => {
    ctx.logout();
    location("/");
  };

  return (
    <>
      <div className="header">
        <div>Welcome To Expence Tracker</div>
        <div>
          Your profile is incomplete :<Link to="/profile">Complete Now</Link>
        </div>
        <div>
          <button className="button" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
      <section className={classes.profile}>
        <form onSubmit={addExpenseHandler}>
          <h3>Enter Expense Details</h3>
          <div className={classes.control}>
            <label htmlFor="amount">Amount</label>
            <input type="number" ref={amountRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <input type="text" ref={descriptionRef} />
          </div>
          <div className={classes.control}>
            <label>Category</label>
            <select ref={categoryRef}>
              <option>Entertainment</option>
              <option>Food</option>
              <option>Recharge</option>
              <option>Bill</option>
              <option>Fuel</option>
              <option>Rent</option>
              <option>Fee</option>
            </select>
          </div>
          <div className={classes.actions}>
            <button>Add Expense</button>
          </div>
        </form>
      </section>
      <div>{showExpenses}</div>
    </>
  );
};

export default Welcome;
