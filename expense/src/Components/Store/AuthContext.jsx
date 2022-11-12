import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  //edit: (id) => {},
  remove: (id) => {},
  addExpense: (obj) => {},
  expense:[],
});

export const AuthContextProvider = (props) => {
  
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [expense, setExpense] = useState([]);

  const userIsLoggedin = !!token;

  const addExpenseHandler = async (obj) => {
    //const object=[...expense,obj]

    const resp = await axios.post(
      "https://expense-tracker-4e84e-default-rtdb.firebaseio.com/Expences.json",
      obj
    );
    console.log(resp);
    setExpense((prev) => {
      return [...prev, obj];
    });
  };
  useEffect(() => {
    const fetchExpense = async () => {
      const responce = await axios.get(
        "https://expense-tracker-4e84e-default-rtdb.firebaseio.com/Expences.json"
      );
      const loadedExpence = [];

      for (const key in responce.data) {
        console.log(key);
        loadedExpence.push({
          id:key,
          enteredAmount: responce.data[key].enteredAmount,
          enteredDescription: responce.data[key].enteredDescription,
          enteredCategory: responce.data[key].enteredCategory,
        });
      }

      setExpense(loadedExpence);
    };
    fetchExpense();
  }, []);

  // const editHandler = async (id) => {
  //   const responce = await axios.put(
  //     `https://expense-tracker-4e84e-default-rtdb.firebaseio.com/Expences/${id}.json`
  //   );
  // };

  const removeHandler = async (id) => {
    console.log(id)
    const responce = await axios.delete(
      `https://expense-tracker-4e84e-default-rtdb.firebaseio.com/Expences/${id}.json`
    );
    const NewExpense=[...expense]
    for (let i = 0; i < NewExpense.length; i++) {
      if (NewExpense[i].id === id) {
        const index = expense.indexOf(NewExpense[i]);
        NewExpense.splice(index, 1);
      }
    }
    setExpense(NewExpense);
  };

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedin,
    login: loginHandler,
    logout: logoutHandler,
    //edit: editHandler,
    remove: removeHandler,
    addExpense: addExpenseHandler,
    expense: expense,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
