import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import '../screen.scss'
import { useDispatch } from "react-redux";
import { createScreen } from "../../redux/action/ScreenAction";

const initialValues = {
  name: "",
  description: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("name cannot be empty"),
  description: Yup.string()
    .required("Description cannot be empty")
    .min(6, "Description cannot be less than 6 characters"),
});

export default function ScreenModal() {
    const dispatch = useDispatch();
    const parsedToken = JSON.parse(localStorage.getItem('token'));


  const onSubmit = (values, {resetForm}) => {
    dispatch(createScreen(values,parsedToken))

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
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Screen
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
          {/* <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
