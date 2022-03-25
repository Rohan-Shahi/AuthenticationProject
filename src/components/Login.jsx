import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useApi } from "../customHooks/useApi";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("email cannot be empty")
    .email("Not a valid email"),
  password: Yup.string()
    .required("Password cannot be empty")
    .min(6, "password cannot be less than 6 characters"),
});

export default function Login() {
  const navigate = useNavigate();

  const { response, error, isLoading, fetchData } = useApi(
    "/auth/login",
    "POST"
  );
  const onSubmit = async (values) => {
    try {
      const res = await fetchData(values);
    //   console.log(res.data.success);
      if (res?.data?.success) {
        localStorage.setItem("token", JSON.stringify(res.data.data.token));
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err);
      navigate("/");
    }
  };

  const { values, touched, errors, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  return (
    <div className="login-page">
      <div className="form">
        <div className="login">
          <div className="login-header">
            <h3>LOGIN</h3>
            <p>Please enter your credentials to login.</p>
          </div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email ? (
            <span className="error"> {errors.email} </span>
          ) : null}
          <input
            type="password"
            placeholder="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password ? (
            <span className="error">{errors.password} </span>
          ) : null}
          <button type="submit">login</button>
          <p className="message">
            Not registered? <a href="/">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
}
