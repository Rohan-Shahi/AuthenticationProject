import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../screen.scss";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/action/productAction";

const initialValues = {
  name: "",
  description: "",
  imageUrl: "",
  quantity: 0,
};

const validationSchema = Yup.object({
  name: Yup.string().required("name cannot be empty"),
  description: Yup.string()
    .required("Description cannot be empty")
    .min(5, "Description cannot be less than 5 characters"),
  imageUrl: Yup.string().url("Invalid url").required('Url is required'),
  quantity: Yup.number("This field must be a number").required(
    "It cannot be empty"
  ),
});

export default function AddProductModal() {
  const dispatch = useDispatch();
  const parsedToken = JSON.parse(localStorage.getItem("token"));

  const onSubmit = ({imageUrl,name,description,quantity}, { resetForm }) => {
    const value = { name ,description,image: imageUrl,quantity: (Number(quantity))}
    dispatch(createProduct(value,parsedToken))
    resetForm();
  };

  const { values, touched, errors, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  return (
    <div
      className="modal fade"
      id="productModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Product
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />{" "}
              <br />
              {touched.name && errors.name ? (
                <div style={{ color: "red" }}>{errors.name}</div>
              ) : null}
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.description && errors.description ? (
                <div style={{ color: "red" }}>{errors.description}</div>
              ) : null}
              <label htmlFor="imageUrl">Image Url</label>
              <input
                type="text"
                name="imageUrl"
                value={values.imageUrl}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.imageUrl && errors.imageUrl ? (
                <div style={{ color: "red" }}>{errors.imageUrl}</div>
              ) : null}
              <label htmlFor="quantity">Qunatity</label>
              <input
                type="text"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.quantity && errors.quantity ? (
                <div style={{ color: "red" }}>{errors.quantity}</div>
              ) : null}
              <div className="btn-groups">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-success">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
