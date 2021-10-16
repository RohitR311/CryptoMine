import {
  COIN_DATA_FAILURE,
  COIN_DATA_REQUEST,
  COIN_DATA_SUCCESS,
  CRYPTO_COIN_DATA_FAILURE,
  CRYPTO_COIN_DATA_REQUEST,
  CRYPTO_COIN_DATA_SUCCESS,
  FAV_COINS,
  FAV_COIN_DATA_FAILURE,
  FAV_COIN_DATA_REQUEST,
  FAV_COIN_DATA_SUCCESS,
  GET_CRYPTO_COINS,
  GET_FAV_COINS,
  REMOVE_FAV_COIN,
  DELETE_FAV_COINS,
  GET_CRYPTO_COIN,
  GET_PREDICTION,
  COIN_INFO_REQUEST,
  COIN_INFO_SUCCESS,
  COIN_INFO_FAILURE,
} from "../constants/coinConstants";

export const coinListReducer = (
  state = {
    coins: [],
  },
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

    default:
      return state;
  }
};

export const cryptoCoinReducer = (state = { crypto: [] }, action) => {
  switch (action.type) {
    case COIN_INFO_REQUEST:
      return { ...state, loading: true, crypto: [] };

    case COIN_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        crypto: action.payload,
      };

    case COIN_INFO_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const watchListReducer = (state = { watchlist: [] }, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export const cryptoCoinsListReducer = (state = { cryptolist: [] }, action) => {
  switch (action.type) {
    case CRYPTO_COIN_DATA_REQUEST:
      return { ...state, loading: true, cryptolist: [] };

    case CRYPTO_COIN_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        cryptolist: action.payload,
      };

    case CRYPTO_COIN_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const cryptoCoinsReducer = (state = { crypto_coins: [] }, action) => {
  switch (action.type) {
    case GET_CRYPTO_COINS:
      return { ...state, crypto_coins: action.payload };

    case GET_CRYPTO_COIN:
      return { ...state, crypto_coin: action.payload };

    case GET_PREDICTION:
      return { ...state, crypto_pred: action.payload };

    default:
      return state;
  }
};

export const favCoinsReducer = (state = { fav_coins: [] }, action) => {
  switch (action.type) {
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

    case DELETE_FAV_COINS:
      return { ...state, fav_coins: [] };

    default:
      return state;
  }
};
