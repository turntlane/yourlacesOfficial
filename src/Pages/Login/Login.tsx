// @ts-nocheck
// import { useEffect } from "react";

// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setCredentials } from "../../../Store/Auth/authSlice";
// // import { useLoginMutation } from "../../../Store/Auth/authApiSlice";
// import { loginUser } from "../features/auth/authSlice";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [login, { isLoading }] = useLoginMutation();

//   const onSubmit = async (e) => {
//     // e.preventDefault();
//     try {
//       const { accessToken } = await login(formik.values).unwrap();
//       console.log("bruh", accessToken);
//       dispatch(setCredentials({ accessToken }));
//       navigate("/dash");
//     } catch (err) {
//       if (!err.status) {
//         setErrMsg("No Server Response");
//       } else if (err.status === 400) {
//         setErrMsg("Missing Username or Password");
//       } else if (err.status === 401) {
//         setErrMsg("Unauthorized");
//       } else {
//         setErrMsg(err.data?.message);
//       }
//       errRef.current.focus();
//     }
//   };

//   const initialValues = {
//     email: "",
//     password: "",
//   };

//   const validationSchema = Yup.object({
//     email: Yup.string().required("Email is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit,
//   });

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={formik.handleSubmit}>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="text"
//             id="email"
//             name="email"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.email}
//           />
//           {formik.touched.email && formik.errors.email ? (
//             <div className="error">{formik.errors.email}</div>
//           ) : null}
//         </div>

//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.password}
//           />
//           {formik.touched.password && formik.errors.password ? (
//             <div className="error">{formik.errors.password}</div>
//           ) : null}
//         </div>

//         <button type="submit" disabled={!formik.isValid || !formik.dirty}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };
// export default Login;

// components/Login.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Store/Auth/authSlice";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { accessToken, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (accessToken) return <Navigate to="/" />;

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
