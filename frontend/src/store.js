import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // lets you write async logic that interacts with the store.
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import {
  coinListReducer,
  cryptoCoinReducer,
  cryptoCoinsListReducer,
  cryptoCoinsReducer,
  favCoinsReducer,
  watchListReducer,
} from "./reducers/coinReducers";
import { categoryListReducer } from "./reducers/categoryReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  coinList: coinListReducer,
  cryptoCoin: cryptoCoinReducer,
  watchList: watchListReducer,
  cryptoCoinsList: cryptoCoinsListReducer,
  cryptoCoins: cryptoCoinsReducer,
  favCoins: favCoinsReducer,
  categoryList: categoryListReducer,
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
