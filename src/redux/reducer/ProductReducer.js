import {
  CREATE_PROUDCT,
  CREATE_PROUDCT_INIT,
  DELETE_PRODUCT,
  DELETE_PRODUCT_INIT,
  FETCH_PRODUCTS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_INIT,
} from "../constant";

const initialState = {
  productList: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        productList: action.payload,
      };

    default:
      return state;
  }
};

export const createProductReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case CREATE_PROUDCT_INIT:
      return {
        ...state,
        success: false,
      };

    case CREATE_PROUDCT:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};

export const deleteProductReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_INIT:
      return {
        ...state,
        success: false,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};

export const updateProductReducer = (state = { success: false }, action) => {
    switch (action.type) {
      case UPDATE_PRODUCT_INIT:
        return {
          ...state,
          success: false,
        };
  
      case UPDATE_PRODUCT:
        return {
          ...state,
          success: true,
        };
  
      default:
        return state;
    }
  };
