import {
  COIN_DATA_FAILURE,
  COIN_DATA_REQUEST,
  COIN_DATA_SUCCESS,
  COIN_INFO_FAILURE,
  COIN_INFO_REQUEST,
  COIN_INFO_SUCCESS,
  CRYPTO_COIN_DATA_FAILURE,
  CRYPTO_COIN_DATA_REQUEST,
  CRYPTO_COIN_DATA_SUCCESS,
  FAV_COINS,
  FAV_COIN_DATA_FAILURE,
  FAV_COIN_DATA_REQUEST,
  FAV_COIN_DATA_SUCCESS,
  GET_CRYPTO_COIN,
  GET_CRYPTO_COINS,
  GET_FAV_COINS,
  GET_PREDICTION,
  REMOVE_FAV_COIN,
} from "../constants/coinConstants";
import axios from "axios";

export const listCoins = (page, currency, pageSize) => async (dispatch) => {
  try {
    dispatch({ type: COIN_DATA_REQUEST });

    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${pageSize}&page=${page}&sparkline=true&price_change_percentage=7d`
    );

    dispatch({
      type: COIN_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COIN_DATA_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const getCoinById = (id) => async (dispatch) => {
  try {
    dispatch({ type: COIN_INFO_REQUEST });

    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}?sparkline=true`
    );

    dispatch({
      type: COIN_INFO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COIN_INFO_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listFavCoins = (currency, favcoin) => async (dispatch) => {
  try {
    dispatch({ type: FAV_COIN_DATA_REQUEST });

    const fav_coins = Array.prototype.map
      .call(favcoin, function (item) {
        return item.coin;
      })
      .join(",");

    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?ids=${fav_coins}&vs_currency=${currency}&order=market_cap_desc&sparkline=true&price_change_percentage=7d`
    );

    dispatch({
      type: FAV_COIN_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAV_COIN_DATA_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listCryptoCoins = (currency, cryptocoin) => async (dispatch) => {
  try {
    dispatch({ type: CRYPTO_COIN_DATA_REQUEST });

    const crypto_coins = Array.prototype.map
      .call(cryptocoin, function (item) {
        return item.name;
      })
      .join(",");

    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?ids=${crypto_coins}&vs_currency=${currency}&order=market_cap_desc&sparkline=true&price_change_percentage=7d`
    );

    dispatch({
      type: CRYPTO_COIN_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CRYPTO_COIN_DATA_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getCryptoCoins = () => async (dispatch) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/api/users/cryptos/`);

  dispatch({ type: GET_CRYPTO_COINS, payload: data });
};

export const getCryptoCoinById = (id) => async (dispatch) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/api/users/${id}/`);

  dispatch({ type: GET_CRYPTO_COIN, payload: data });
};

export const getCryptoCoinPrediction =
  (file_n, date_p, open_p, close_p, volume) => async (dispatch) => {
    const { data } = await axios.post(
      `http://127.0.0.1:8000/api/users/myprediction/`,
      {
        file: file_n,
        date_p: date_p,
        open_p: open_p,
        close_p: close_p,
        volume: volume,
      }
    );

    dispatch({ type: GET_PREDICTION, payload: data });
  };

export const getFavCoins = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const { data } = await axios.get(
    `http://127.0.0.1:8000/api/users/mywatchlist/`,
    config
  );

  dispatch({ type: GET_FAV_COINS, payload: data });
};

export const updateFavCoins = (coin) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const { data } = await axios.post(
    `http://127.0.0.1:8000/api/users/create/`,
    {
      coin: coin,
    },
    config
  );

  if (data !== "Coin was deleted successfully")
    dispatch({ type: FAV_COINS, payload: data });
  else dispatch({ type: REMOVE_FAV_COIN, payload: coin });
};
