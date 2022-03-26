import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../screen.scss";
import { useDispatch } from "react-redux";
import { updateRole } from "../../redux/action/RoleAction";

const validationSchema = Yup.object({
  name: Yup.string().required("name cannot be empty"),
  description: Yup.string()
    .required("Description cannot be empty")
    .min(5, "Description cannot be less than 5 characters"),
});

export default function EditRoleModal({
  editId,
  editName,
  editDesc,
  setIsEditing,
}) {
  const dispatch = useDispatch();
  const parsedToken = JSON.parse(localStorage.getItem("token"));

  const initialValues = {
    name: editName,
    description: editDesc,
  };

  const onSubmit = (values, { resetForm }) => {
    dispatch(updateRole(editId, values, parsedToken));
    resetForm();
    // setIsEditing(false);
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
      id="editRoleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="editRoleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Role
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setIsEditing(false);
              }}
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
              <div className="btn-groups">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => {
                    setIsEditing(false);
                  }}
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
