import {
    CATEGORY_DATA_FAILURE,
    CATEGORY_DATA_REQUEST,
    CATEGORY_DATA_SUCCESS,
} from "../constants/categoryConstants";

export const categoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case CATEGORY_DATA_REQUEST:
            return { loading: true, categories: [] };

        case CATEGORY_DATA_SUCCESS:
            return {
                loading: false,
                categories: action.payload,
            };

        case CATEGORY_DATA_FAILURE:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};
