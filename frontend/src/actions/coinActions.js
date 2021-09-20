import { COIN_DATA_FAILURE, COIN_DATA_REQUEST, COIN_DATA_SUCCESS } from "../constants/coinConstants";
import axios from "axios";

export const listCoins =
  (page, currency, pageSize) =>
  async (dispatch) => {
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
