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
export const listFavCoins = (currency, favcoin) => async (dispatch) => {
  try {
    dispatch({ type: FAV_COIN_DATA_REQUEST });

    const fav_coins = Array.prototype.map
      .call(favcoin, function (item) {
        return item.coin;
      })
      .join(",");

    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&ids=bitcoin&sparkline=true&price_change_percentage=7d&ids=${fav_coins}`
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
