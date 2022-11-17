import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthReducer";
import expenseSlice from './ExpenceReducer'
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    expense:expenseSlice,
    theme:themeSlice
    
  },
});
export default store;
