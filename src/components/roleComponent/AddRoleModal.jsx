import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import '../screen.scss'
import { useDispatch } from "react-redux";
import { createRole } from "../../redux/action/RoleAction";

const initialValues = {
  name: "",
  description: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("name cannot be empty"),
  description: Yup.string()
    .required("Description cannot be empty")
    .min(5, "Description cannot be less than 5 characters"),
});

export default function AddRoleModal() {
    const dispatch = useDispatch();
    const parsedToken = JSON.parse(localStorage.getItem('token'));


  const onSubmit = (values, {resetForm}) => {
    dispatch(createRole(values,parsedToken))
    resetForm();
  };

  const { values,touched,errors,handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div
      className="modal fade"
      id="roleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="roleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Role
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
              /> <br />
              {touched.name && errors.name ? (
                <span style={{ color: "red" }}>{errors.name}</span>
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
                <span style={{ color: "red" }}>{errors.description}</span>
              ) : null}
              
              <div className='btn-groups'>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>

              <button  type="submit" className="btn btn-success">
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