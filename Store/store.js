import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./SearchBar/SearchSlice";
import userReducer from "./User/UserSlice";
const store = configureStore({
  reducer:{

    search:searchReducer,
    user:userReducer
  }
  })


export default store