// // @ts-nocheck
// // import { useEffect } from "react";

// // import { useNavigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { setCredentials } from "../../../Store/Auth/authSlice";
// // // import { useLoginMutation } from "../../../Store/Auth/authApiSlice";
// // import { loginUser } from "../features/auth/authSlice";
// // import { useFormik } from "formik";
// // import * as Yup from "yup";

// // const Login = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const [login, { isLoading }] = useLoginMutation();

// //   const onSubmit = async (e) => {
// //     // e.preventDefault();
// //     try {
// //       const { accessToken } = await login(formik.values).unwrap();
// //       console.log("bruh", accessToken);
// //       dispatch(setCredentials({ accessToken }));
// //       navigate("/dash");
// //     } catch (err) {
// //       if (!err.status) {
// //         setErrMsg("No Server Response");
// //       } else if (err.status === 400) {
// //         setErrMsg("Missing Username or Password");
// //       } else if (err.status === 401) {
// //         setErrMsg("Unauthorized");
// //       } else {
// //         setErrMsg(err.data?.message);
// //       }
// //       errRef.current.focus();
// //     }
// //   };

// //   const initialValues = {
// //     email: "",
// //     password: "",
// //   };

// //   const validationSchema = Yup.object({
// //     email: Yup.string().required("Email is required"),
// //     password: Yup.string().required("Password is required"),
// //   });

// //   const formik = useFormik({
// //     initialValues,
// //     validationSchema,
// //     onSubmit,
// //   });

// //   if (isLoading) return <p>Loading...</p>;

// //   return (
// //     <div>
// //       <h2>Login</h2>
// //       <form onSubmit={formik.handleSubmit}>
// //         <div>
// //           <label htmlFor="email">Email</label>
// //           <input
// //             type="text"
// //             id="email"
// //             name="email"
// //             onChange={formik.handleChange}
// //             onBlur={formik.handleBlur}
// //             value={formik.values.email}
// //           />
// //           {formik.touched.email && formik.errors.email ? (
// //             <div className="error">{formik.errors.email}</div>
// //           ) : null}
// //         </div>

// //         <div>
// //           <label htmlFor="password">Password</label>
// //           <input
// //             type="password"
// //             id="password"
// //             name="password"
// //             onChange={formik.handleChange}
// //             onBlur={formik.handleBlur}
// //             value={formik.values.password}
// //           />
// //           {formik.touched.password && formik.errors.password ? (
// //             <div className="error">{formik.errors.password}</div>
// //           ) : null}
// //         </div>

// //         <button type="submit" disabled={!formik.isValid || !formik.dirty}>
// //           Submit
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };
// // export default Login;

// // components/Login.js
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../Store/Auth/authSlice";
// import { Navigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const { accessToken, loading, error } = useSelector((state) => state.auth);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser({ email, password }));
//   };

//   if (accessToken) return <Navigate to="/" />;

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <button type="submit" disabled={loading}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
//@ts-nocheck
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Store/Auth/authSlice";
import { useLoginMutation } from "../../Store/Auth/authApiSlice";
import usePersist from "../../Hooks/usePersist";
import useTitle from "../../Hooks/useTitle";
import { setUser } from "../../Store/Users/userSlice";

const Login = () => {
  useTitle("User Login");

  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken, user } = await login({
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ accessToken }));
      dispatch(setUser({ user }));
      setEmail("");
      setPassword("");
      console.log("its hittttinng", user);
      console.log("its hittttinng access token", accessToken);
      navigate("/");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <div>Loading...</div>;

  const content = (
    <section className="public">
      <header>
        <h1>User Login</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            className="form__input"
            type="text"
            id="email"
            ref={userRef}
            value={email}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button className="form__submit-button">Sign In</button>

          <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust This Device
          </label>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );

  return content;
};
export default Login;
