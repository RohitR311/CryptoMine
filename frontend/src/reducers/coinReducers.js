import {
  COIN_DATA_FAILURE,
  COIN_DATA_REQUEST,
  COIN_DATA_SUCCESS,
  FAV_COINS,
  FAV_COIN_DATA_FAILURE,
  FAV_COIN_DATA_REQUEST,
  FAV_COIN_DATA_SUCCESS,
  GET_FAV_COINS,
  REMOVE_FAV_COIN,
} from "../constants/coinConstants";

export const coinListReducer = (
  state = { coins: [], fav_coins: [], watchlist: [] },
  action
) => {
  switch (action.type) {
    case COIN_DATA_REQUEST:
      return { ...state, loading: true, coins: [] };

    case COIN_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        coins: action.payload,
      };

    case COIN_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FAV_COIN_DATA_REQUEST:
      return { ...state, loading: true, watchlist: [] };

    case FAV_COIN_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        watchlist: action.payload,
      };

    case FAV_COIN_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_FAV_COINS:
      return { ...state, fav_coins: action.payload };

    case REMOVE_FAV_COIN:
      return {
        ...state,
        fav_coins: state.fav_coins.filter(
          (coin) => coin.coin !== action.payload
        ),
      };

    case FAV_COINS:
      return { ...state, fav_coins: [...state.fav_coins, action.payload] };

    default:
      return state;
  }
};
