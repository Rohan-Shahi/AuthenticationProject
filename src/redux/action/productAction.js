import axios from "axios";
import {
  CREATE_PROUDCT,
  CREATE_PROUDCT_INIT,
  DELETE_PRODUCT,
  DELETE_PRODUCT_INIT,
  FETCH_PRODUCTS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_INIT,
} from "../constant";

export const fetchProducts = (token) => async (dispatch) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://ecom-react-task.herokuapp.com/product",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data?.success) {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: response?.data?.data,
      });
    }
  } catch (err) {
    alert(err);
  }
};

export const createProduct = (productInfo, token) => async (dispatch) => {
  dispatch({
    type: CREATE_PROUDCT_INIT,
  });
  try {
    const response = await axios({
      method: "POST",
      url: `https://ecom-react-task.herokuapp.com/product`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: productInfo,
    });

    if (response?.data?.success) {
      dispatch({
        type: CREATE_PROUDCT,
      });
    }
  } catch (err) {
    alert(err);
  }
};

export const deleteProduct = (id, token) => async (dispatch) => {
  dispatch({
    type: DELETE_PRODUCT_INIT,
  });
  try {
    const response = await axios({
      method: "DELETE",
      url: `https://ecom-react-task.herokuapp.com/product/${id}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data?.success) {
      dispatch({
        type: DELETE_PRODUCT,
      });
    }
  } catch (err) {
    alert(err);
  }
};

export const updateProduct = (id, productInfo, token) => async (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCT_INIT,
  });
  try {
    const response = await axios({
      method: "PUT",
      url: `https://ecom-react-task.herokuapp.com/product/${id}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: productInfo,
    });

    if (response?.data?.success) {
      dispatch({ type: UPDATE_PRODUCT });
    }
  } catch (err) {
    alert(err);
  }
};

