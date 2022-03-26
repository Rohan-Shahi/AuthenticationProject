import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../screen.scss";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/action/UserAction";
// import { useDispatch } from "react-redux";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("name cannot be empty"),
  email: Yup.string().email("Inavlid email").required("Email cannot be empty"),
  password: Yup.string()
    .required("Password cannot be empty")
    .min(6, "password cannot be less than 6 characters"),
});

export default function UserModal() {
  const dispatch = useDispatch();
  const parsedToken = JSON.parse(localStorage.getItem("token"));

  const onSubmit = (values, { resetForm }) => {
    dispatch(createUser(values, parsedToken));
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
      id="userModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="userModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add User
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
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name ? (
                <span style={{ color: "red" }}>{errors.name}</span>
              ) : null}
              <br />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email ? (
                <span style={{ color: "red" }}>{errors.email}</span>
              ) : null}
              <br />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password ? (
                <span style={{ color: "red" }}>{errors.password}</span>
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
