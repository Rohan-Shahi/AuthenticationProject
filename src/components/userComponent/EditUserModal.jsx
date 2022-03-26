import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../screen.scss";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/action/UserAction";
// import { createUser } from "../../redux/action/UserAction";

const validationSchema = Yup.object({
  name: Yup.string().required("name cannot be empty"),
  email: Yup.string().email("Inavlid email").required("Email cannot be empty"),
  password: Yup.string()
    .required("Password cannot be empty")
    .min(6, "password cannot be less than 6 characters"),
});

export default function EditUserModal({isEditing,editId,editName,editEmail,setIsEditing}) {

  const initialValues = {
    name: editName,
    email: editEmail,
    password: "",
  };
  const dispatch = useDispatch();
  const parsedToken = JSON.parse(localStorage.getItem("token"));

  const onSubmit = (values, { resetForm }) => {
    dispatch(updateUser(values,editId,parsedToken));
    resetForm();
    setIsEditing(false);
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
      id="editUserModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="editUserModalLabel"
      aria-hidden="true"
     
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit User
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={()=>{ setIsEditing(false)}}
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
                  onClick={()=>{ setIsEditing(false)}}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
