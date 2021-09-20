import {
  COIN_DATA_FAILURE,
  COIN_DATA_REQUEST,
  COIN_DATA_SUCCESS,
} from "../constants/coinConstants";

export const coinListReducer = (state = { coins: [] }, action) => {
  switch (action.type) {
    case COIN_DATA_REQUEST:
      return { loading: true, coins: [] };

    case COIN_DATA_SUCCESS:
      return {
        loading: false,
        coins: action.payload,
      };

    case COIN_DATA_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
