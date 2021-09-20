import {
  CATEGORY_DATA_FAILURE,
  CATEGORY_DATA_REQUEST,
  CATEGORY_DATA_SUCCESS,
} from "../constants/categoryConstants";

import axios from "axios";

export const listCategories = () => async dispatch => {
  try {
    dispatch({ type: CATEGORY_DATA_REQUEST });

    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/categories`
    );

    dispatch({
      type: CATEGORY_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DATA_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
