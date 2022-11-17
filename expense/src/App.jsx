import React from "react";
import AuthForm from "./Components/Auth/AuthForm";
import Welcome from "./Components/Layout/Welcome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import Verification from "./Components/Auth/Verification";
import ResetPassword from "./Components/Auth/ResetPassword";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./Components/Store/AuthReducer";
import {
  getExpenseData,
  sendExpenseData,
} from "./Components/Store/expense-actions";
import classes from "./App.module.css";

let isInitial = true;
const App = () => {
  const loggedIn = useSelector((state) => authActions.login);
  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expense);
  const toggle = useSelector((state) => state.theme.toggle);

  let totalAmount = 0;
  totalAmount = expense.expenses?.reduce((ack, item) => {
    return (ack += Number(item.enteredAmount));
  }, 0);

  useEffect(() => {
    dispatch(authActions.initialToken());
  }, []);

  useEffect(() => {
    dispatch(getExpenseData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (expense.changed) {
      dispatch(sendExpenseData(expense));
    }
  }, [expense, dispatch]);

  return (
    <div className={totalAmount >= 10000 && toggle ? classes.dark : ""}>
      <BrowserRouter>
        <Routes>
          {loggedIn && <Route path="/Welcome" element={<Welcome />} />}
          <Route path="/" element={<AuthForm />} />
          {loggedIn && (
            <Route path="/Verification" element={<Verification />} />
          )}
          {loggedIn && <Route path="/Profile" element={<Profile />} />}
          <Route path="/Reset" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
