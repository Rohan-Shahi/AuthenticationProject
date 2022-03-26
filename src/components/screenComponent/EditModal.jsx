import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../screen.scss";
import { useDispatch } from "react-redux";
import { updateScreen } from "../../redux/action/ScreenAction";

const validationSchema = Yup.object({
  name: Yup.string().required("name cannot be empty"),
  description: Yup.string()
    .required("Description cannot be empty")
    .min(6, "Description cannot be less than 6 characters"),
});

export default function EditModal({editId, editName,editDesc,setIsEditing}) {
   
  const dispatch = useDispatch();
  const parsedToken = JSON.parse(localStorage.getItem("token"));

  const initialValues = {
    name: editName,
    description: editDesc,
  };

  const onSubmit = (values, { resetForm }) => {
    dispatch(updateScreen(editId,values,parsedToken))
    resetForm();
    setIsEditing(false)
  };

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <div
      className="modal fade"
      id="editModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Screen
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
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
              />{" "}
              <br />
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
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
                  Update Screen
                </button>
              </div>
            </form>
          </div>
         
        </div>
      </div>
    </div>
  );
}
