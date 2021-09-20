import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // lets you write async logic that interacts with the store.
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducer";
import { coinListReducer } from "./reducers/coinReducers";
import { categoryListReducer } from "./reducers/categoryReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  coinList: coinListReducer,
  categoryList: categoryListReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
