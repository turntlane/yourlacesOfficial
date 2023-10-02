// import React from "react";
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBInput,
//   MDBIcon,
//   MDBRow,
//   MDBCol,
//   MDBCheckbox,
// } from "mdb-react-ui-kit";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { REGISTER_URL } from "../../Config";
// import axios from "../../Config";
// import AuthService from "../../Services/AuthService";

// interface Response {
//   username: string;
//   email: string;
//   password: string;
// }

// function Register() {
//   // Formik initialization
//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       username: Yup.string()
//         .min(4, "Username must be at least 4 characters")
//         .max(20, "Username must be under 20 characters")
//         .required("Username is required"),
//       email: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required"),
//       password: Yup.string()
//         .required("Please Enter your password")
//         .matches(
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
//           "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
//         ),
//     }),
//     onSubmit: async (values: Response) => {
//       try {
//         console.log("we are here", JSON.stringify(values));
//         const response: Response = await axios.post(
//           REGISTER_URL,
//           values
//           // JSON.stringify({ username, email, password }),
//           // {
//           //   headers: { "Content-Type": "application/json" },
//           //   withCredentials: true,
//           // }
//         );
//         console.log("response: ", response);
//       } catch (error) {}
//       // You can handle form submission here, e.g., send data to the server
//       console.log("Form submitted with values:", values);
//     },
//   });

//   return (
//     <MDBContainer fluid>
//       <MDBRow className="g-0 align-items-center">
//         <MDBCol col="6">
//           <MDBCard
//             className="my-5 cascading-right"
//             style={{
//               background: "hsla(0, 0%, 100%, 0.55)",
//               backdropFilter: "blur(30px)",
//             }}
//           >
//             <MDBCardBody className="p-5 shadow-5 text-center">
//               <h2 className="fw-bold mb-5">Sign up now</h2>

//               <Formik
//                 initialValues={formik.initialValues}
//                 // validate={formik.validationSchema}
//                 validationSchema={formik.errors}
//                 onSubmit={() => formik.handleSubmit()}
//               >
//                 <Form>
//                   <div className="form-group">
//                     <label htmlFor="username">Username</label>
//                     <Field
//                       type="text"
//                       id="username"
//                       name="username"
//                       className="form-control"
//                     />
//                     <ErrorMessage
//                       name="username"
//                       component="div"
//                       className="text-danger"
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="email">Email</label>
//                     <Field
//                       type="email"
//                       id="email"
//                       name="email"
//                       className="form-control"
//                     />
//                     <ErrorMessage
//                       name="email"
//                       component="div"
//                       className="text-danger"
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="password">Password</label>
//                     <Field
//                       type="password"
//                       id="password"
//                       name="password"
//                       className="form-control"
//                     />
//                     <ErrorMessage
//                       name="password"
//                       component="div"
//                       className="text-danger"
//                     />
//                   </div>

//                   <MDBBtn type="submit" color="primary">
//                     Submit
//                   </MDBBtn>
//                 </Form>
//               </Formik>

//               {/*
//               <form onSubmit={formik.handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="username">Username</label>
//                   <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.username}
//                   />
//                   {formik.touched.username && formik.errors.username ? (
//                     <div className="error">{formik.errors.username}</div>
//                   ) : null}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <input
//                     type="text"
//                     id="email"
//                     name="email"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.email}
//                   />
//                   {formik.touched.email && formik.errors.email ? (
//                     <div className="error">{formik.errors.email}</div>
//                   ) : null}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.password}
//                   />
//                   {formik.touched.password && formik.errors.password ? (
//                     <div className="error">{formik.errors.password}</div>
//                   ) : null}
//                 </div>

//                 <button type="submit">Register</button>
//               </form> */}

//               <MDBInput
//                 wrapperClass="mb-4"
//                 label="Username"
//                 id="form1"
//                 type="username"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.username}
//               />
//               {formik.touched.username && formik.errors.username ? (
//                 <div className="error">{formik.errors.username}</div>
//               ) : null}

//               <MDBInput
//                 wrapperClass="mb-4"
//                 label="Email"
//                 id="form3"
//                 type="email"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.email}
//               />
//               {formik.touched.email && formik.errors.email ? (
//                 <div className="error">{formik.errors.email}</div>
//               ) : null}
//               <MDBInput
//                 wrapperClass="mb-4"
//                 label="Password"
//                 id="form4"
//                 type="password"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.password}
//               />
//               {formik.touched.password && formik.errors.password ? (
//                 <div className="error">{formik.errors.password}</div>
//               ) : null}

//               {/* <div className="d-flex justify-content-center mb-4">
//                 <MDBCheckbox
//                   name="flexCheck"
//                   value=""
//                   id="flexCheckDefault"
//                   label="Subscribe to our newsletter"
//                 />
//               </div> */}

//               <MDBBtn className="w-100 mb-4" size="lg">
//                 sign up
//               </MDBBtn>

//               <div className="text-center">
//                 <p>Already have an account?</p>

//                 <MDBBtn
//                   tag="a"
//                   color="none"
//                   className="mx-3"
//                   style={{ color: "#1266f1" }}
//                 >
//                   <MDBIcon far icon="user-circle" />
//                   {/* <MDBIcon fab icon="users" size="sm" /> */}
//                 </MDBBtn>
//                 {/*
//                 <MDBBtn
//                   tag="a"
//                   color="none"
//                   className="mx-3"
//                   style={{ color: "#1266f1" }}
//                 >
//                   <MDBIcon fab icon="twitter" size="sm" />
//                 </MDBBtn>

//                 <MDBBtn
//                   tag="a"
//                   color="none"
//                   className="mx-3"
//                   style={{ color: "#1266f1" }}
//                 >
//                   <MDBIcon fab icon="google" size="sm" />
//                 </MDBBtn>

//                 <MDBBtn
//                   tag="a"
//                   color="none"
//                   className="mx-3"
//                   style={{ color: "#1266f1" }}
//                 >
//                   <MDBIcon fab icon="github" size="sm" />
//                 </MDBBtn> */}
//               </div>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>

//         <MDBCol col="6">
//           <img
//             src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
//             className="w-100 rounded-4 shadow-4"
//             alt=""
//             // fluid
//           />
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// }

// export default Register;

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { REGISTER_URL } from "../../Config";
import axios from "../../Config";
import AuthService from "../../Services/AuthService";

interface Response {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  // Formik initialization
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, "Username must be at least 4 characters")
        .max(20, "Username must be under 20 characters")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    onSubmit: async (values: Response) => {
      try {
        console.log("we are here", JSON.stringify(values));
        const response: Response = await axios.post(
          REGISTER_URL,
          values
          // JSON.stringify({ username, email, password }),
          // {
          //   headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
          // }
        );
        console.log("response: ", response);
      } catch (error) {}
      // You can handle form submission here, e.g., send data to the server
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

// import { useRef, useState, useEffect } from "react";
// import {
//   faCheck,
//   faTimes,
//   faInfoCircle,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "../../Config/index";
// import {
//   Formik,
//   FormikHelpers,
//   FormikProps,
//   Form,
//   Field,
//   FieldProps,
// } from "formik";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = "/register";

// interface Response {
//   data: any;
//   accessToken: string;
// }

// interface FormValues {
//   username: string;
//   email: string;
//   password: string;
// }

// const Register = () => {
//   const userRef = useRef<any>();
//   const errRef = useRef<any>();

//   const [user, setUser] = useState("");
//   const [validName, setValidName] = useState(false);
//   const [userFocus, setUserFocus] = useState(false);

//   const [pwd, setPwd] = useState("");
//   const [validPwd, setValidPwd] = useState(false);
//   const [pwdFocus, setPwdFocus] = useState(false);

//   const [matchPwd, setMatchPwd] = useState("");
//   const [validMatch, setValidMatch] = useState(false);
//   const [matchFocus, setMatchFocus] = useState(false);

//   const [errMsg, setErrMsg] = useState("");
//   const [success, setSuccess] = useState(false);

//   const intitialFormValues: FormValues = {
//     username: "",
//     email: "",
//     password: "",
//   };

//   useEffect(() => {
//     userRef.current.focus();
//   }, []);

//   useEffect(() => {
//     setValidName(USER_REGEX.test(user));
//   }, [user]);

//   useEffect(() => {
//     setValidPwd(PWD_REGEX.test(pwd));
//     setValidMatch(pwd === matchPwd);
//   }, [pwd, matchPwd]);

//   useEffect(() => {
//     setErrMsg("");
//   }, [user, pwd, matchPwd]);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     // if button enabled with JS hack
//     const v1 = USER_REGEX.test(user);
//     const v2 = PWD_REGEX.test(pwd);
//     if (!v1 || !v2) {
//       setErrMsg("Invalid Entry");
//       return;
//     }
//     try {
//       const response: Response = await axios.post(
//         REGISTER_URL,
//         JSON.stringify({ user, pwd }),
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );
//       console.log(response?.data);
//       console.log(response?.accessToken);
//       console.log(JSON.stringify(response));
//       setSuccess(true);
//       //clear state and controlled inputs
//       //need value attrib on inputs for this
//       setUser("");
//       setPwd("");
//       setMatchPwd("");
//     } catch (err: any) {
//       if (!err?.response) {
//         setErrMsg("No Server Response");
//       } else if (err.response?.status === 409) {
//         setErrMsg("Username Taken");
//       } else {
//         setErrMsg("Registration Failed");
//       }
//       errRef.current.focus();
//     }
//   };

//   return (
//     <>
//       <div>
//         <h1>My Example</h1>
//         <Formik
//           initialValues={intitialFormValues}
//           onSubmit={(values, actions) => {
//             console.log({ values, actions });
//             alert(JSON.stringify(values, null, 2));
//             actions.setSubmitting(false);
//           }}
//         >
//           <Form>
//             <label htmlFor="firstName">First Name</label>
//             <Field id="firstName" name="firstName" placeholder="First Name" />
//             <button type="submit">Submit</button>
//           </Form>
//         </Formik>
//       </div>
//       {success ? (
//         <section>
//           <h1>Success!</h1>
//           <p>
//             <a href="#">Sign In</a>
//           </p>
//         </section>
//       ) : (
//         <section>
//           <p
//             ref={errRef}
//             className={errMsg ? "errmsg" : "offscreen"}
//             aria-live="assertive"
//           >
//             {errMsg}
//           </p>
//           <h1>Register</h1>
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="username">
//               Username:
//               <FontAwesomeIcon
//                 icon={faCheck}
//                 className={validName ? "valid" : "hide"}
//               />
//               <FontAwesomeIcon
//                 icon={faTimes}
//                 className={validName || !user ? "hide" : "invalid"}
//               />
//             </label>
//             <input
//               type="text"
//               id="username"
//               ref={userRef}
//               autoComplete="off"
//               onChange={(e) => setUser(e.target.value)}
//               value={user}
//               required
//               aria-invalid={validName ? "false" : "true"}
//               aria-describedby="uidnote"
//               onFocus={() => setUserFocus(true)}
//               onBlur={() => setUserFocus(false)}
//             />
//             <p
//               id="uidnote"
//               className={
//                 userFocus && user && !validName ? "instructions" : "offscreen"
//               }
//             >
//               <FontAwesomeIcon icon={faInfoCircle} />
//               4 to 24 characters.
//               <br />
//               Must begin with a letter.
//               <br />
//               Letters, numbers, underscores, hyphens allowed.
//             </p>

//             <label htmlFor="password">
//               Password:
//               <FontAwesomeIcon
//                 icon={faCheck}
//                 className={validPwd ? "valid" : "hide"}
//               />
//               <FontAwesomeIcon
//                 icon={faTimes}
//                 className={validPwd || !pwd ? "hide" : "invalid"}
//               />
//             </label>
//             <input
//               type="password"
//               id="password"
//               onChange={(e) => setPwd(e.target.value)}
//               value={pwd}
//               required
//               aria-invalid={validPwd ? "false" : "true"}
//               aria-describedby="pwdnote"
//               onFocus={() => setPwdFocus(true)}
//               onBlur={() => setPwdFocus(false)}
//             />
//             <p
//               id="pwdnote"
//               className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
//             >
//               <FontAwesomeIcon icon={faInfoCircle} />
//               8 to 24 characters.
//               <br />
//               Must include uppercase and lowercase letters, a number and a
//               special character.
//               <br />
//               Allowed special characters:{" "}
//               <span aria-label="exclamation mark">!</span>{" "}
//               <span aria-label="at symbol">@</span>{" "}
//               <span aria-label="hashtag">#</span>{" "}
//               <span aria-label="dollar sign">$</span>{" "}
//               <span aria-label="percent">%</span>
//             </p>

//             <label htmlFor="confirm_pwd">
//               Confirm Password:
//               <FontAwesomeIcon
//                 icon={faCheck}
//                 className={validMatch && matchPwd ? "valid" : "hide"}
//               />
//               <FontAwesomeIcon
//                 icon={faTimes}
//                 className={validMatch || !matchPwd ? "hide" : "invalid"}
//               />
//             </label>
//             <input
//               type="password"
//               id="confirm_pwd"
//               onChange={(e) => setMatchPwd(e.target.value)}
//               value={matchPwd}
//               required
//               aria-invalid={validMatch ? "false" : "true"}
//               aria-describedby="confirmnote"
//               onFocus={() => setMatchFocus(true)}
//               onBlur={() => setMatchFocus(false)}
//             />
//             <p
//               id="confirmnote"
//               className={
//                 matchFocus && !validMatch ? "instructions" : "offscreen"
//               }
//             >
//               <FontAwesomeIcon icon={faInfoCircle} />
//               Must match the first password input field.
//             </p>

//             <button
//               disabled={!validName || !validPwd || !validMatch ? true : false}
//             >
//               Sign Up
//             </button>
//           </form>
//           <p>
//             Already registered?
//             <br />
//             <span className="line">
//               {/*put router link here*/}
//               <a href="/">Sign In</a>
//             </span>
//           </p>
//         </section>
//       )}
//     </>
//   );
// };

// export default Register;
