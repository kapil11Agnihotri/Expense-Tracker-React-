import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Welcome.css";
import classes from "../Profile/Profile.module.css";
import ExpenseList from "./ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/AuthReducer";
import { expenseActions } from "../Store/ExpenceReducer";
import Footer from "./Footer";
import { CSVLink } from "react-csv";

const Welcome = () => {
  const data1 = useSelector((state) => state.expense.expenses);
  const location = useNavigate();
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expense.expenses);

  let totalAmount = 0;
  totalAmount = expense?.reduce((ack, item) => {
    return (ack += Number(item.enteredAmount));
  }, 0);

  console.log(totalAmount);

  const submitHandler = (event) => {
    event.preventDefault();
    const obj = {
      enteredAmount: amountRef.current.value,
      enteredDescription: descriptionRef.current.value,
      enteredCategory: categoryRef.current.value,
    };
    dispatch(expenseActions.addExpense(obj));
  };

  const showExpenses = expense.map((item, index) => {
    return (
      <ExpenseList
        key={Math.random()}
        id={index}
        amount={item.enteredAmount}
        description={item.enteredDescription}
        category={item.enteredCategory}
      />
    );
  });

  const logoutHandler = () => {
    dispatch(authActions.logout());
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
      <div>{totalAmount >= 10000 ? <Footer /> : <></>}</div>
      <section className={classes.profile}>
        <form onSubmit={submitHandler}>
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
      <div style={{ marginLeft: "45%" }}>
        {totalAmount >= 10000 && (
          <button>
            <CSVLink filename={"Expenses"} data={data1}>
              Dounload all your Expenses
            </CSVLink>
          </button>
        )}
      </div>
      <div>{showExpenses}</div>
    </>
  );
};

export default Welcome;
