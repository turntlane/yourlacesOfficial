// @ts-nocheck
import { useState, useEffect } from "react";
import "./NewUserForm.css";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../Config/roles";
import { Formik, Form, useField, ErrorMessage, Field, useFormik } from "formik";
import * as Yup from "yup";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["User"]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setRoles(values);
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  // const content = (
  //   <>
  //     <p className={errClass}>{error?.data?.message}</p>

  //     <form className="form" onSubmit={onSubmit}>
  //       <div className="form__title-row">
  //         <h2>New User</h2>
  //         <div className="form__action-buttons">
  //           <button className="icon-button" title="Save" disabled={!canSave}>
  //             <FontAwesomeIcon icon={faSave} />
  //           </button>
  //         </div>
  //       </div>
  //       <label className="form__label" htmlFor="username">
  //         Username: <span className="nowrap">[3-20 letters]</span>
  //       </label>
  //       <input
  //         className={`form__input ${validUserClass}`}
  //         id="username"
  //         name="username"
  //         type="text"
  //         autoComplete="off"
  //         value={username}
  //         onChange={onUsernameChanged}
  //       />

  //       <label className="form__label" htmlFor="password">
  //         Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
  //       </label>
  //       <input
  //         className={`form__input ${validPwdClass}`}
  //         id="password"
  //         name="password"
  //         type="password"
  //         value={password}
  //         onChange={onPasswordChanged}
  //       />

  //       <label className="form__label" htmlFor="roles">
  //         ASSIGNED ROLES:
  //       </label>
  //       <select
  //         id="roles"
  //         name="roles"
  //         className={`form__select ${validRolesClass}`}
  //         multiple={true}
  //         size="3"
  //         value={roles}
  //         onChange={onRolesChanged}
  //       >
  //         {options}
  //       </select>
  //     </form>
  //   </>
  // );

  // const RegisterValidation = object().shape({
  //   username: string().required("Required"),
  //   email: string()
  //     .required("Valid email required")
  //     .email("Valid email required"),
  //   password: string().min(8, "Required").required("Required"),
  //   confirmPassword: string()
  //     .required("Please confirm your password")
  //     .oneOf([ref("password")], "Passwords do not match"),
  //   roles: array().of(string()).min(1),
  // });

  // const Input = ({ name, label, ...props }) => {
  //   const [field, meta] = useField(name);
  //   return (
  //     <div className="mb-4">
  //       <label
  //         className="block text-gray-700 text-sm font-bold"
  //         for={field.name}
  //       >
  //         {label}
  //       </label>
  //       <input
  //         className={`${
  //           meta.error && meta.touched ? "border-red-500" : ""
  //         } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
  //         {...field}
  //         {...props}
  //       />
  //       <ErrorMessage
  //         name={field.name}
  //         component="div"
  //         className="text-red-500 text-xs"
  //       />
  //     </div>
  //   );
  // };

  // const handleSubmit = (values) => {
  //   console.log(values);
  // };

  // // return content;
  // return (
  //   <div className="h-screen flex items-center justify-center flex-col bg-gray-100">
  //     <Formik
  //       initialValues={{
  //         name: "",
  //         email: "",
  //         password: "",
  //         confirmPassword: "",
  //         roles: [],
  //       }}
  //       onSubmit={onSubmit}
  //       validationSchema={RegisterValidation}
  //     >
  //       <Form className="bg-white w-6/12 shadow-md rounded px-8 pt-6 pb-8">
  //         <Input name="username" label="Username" />
  //         <Input name="email" label="Email" />
  //         <Input name="password" label="Password" type="password" />
  //         <Input
  //           name="confirmPassword"
  //           label="Confirm Password"
  //           type="password"
  //         />
  //         <Field as="select" name="roles" label="Roles">
  //           {options}
  //         </Field>
  //         <div className="flex items-center justify-between">
  //           <button
  //             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  //             type="submit"
  //           >
  //             Register
  //           </button>
  //         </div>
  //       </Form>
  //     </Formik>
  //   </div>
  // );

  const onSubmit = async (e) => {
    // e.preventDefault();
    console.log("we are here");
    // if (canSave) {
    await addNewUser(formik.values);
    // }
  };

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    roles: ["User"], // Default role
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    roles: Yup.array()
      .of(Yup.string())
      .required("Role is required")
      .min(1, "Select at least one role"), // At least one role
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const canSave =
    [formik.values.roles.length, validUsername, validPassword].every(Boolean) &&
    !isLoading;

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
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

        <div>
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

        <div>
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

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="roles">roles</label>
          <select
            multiple // Allow multiple selections
            id="roles"
            name="roles"
            onChange={(e) => {
              formik.setFieldValue(
                "roles",
                Array.from(e.target.selectedOptions, (option) => option.value)
              );
            }}
            onBlur={formik.handleBlur}
            value={formik.values.roles}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {formik.touched.roles && formik.errors.roles ? (
            <div className="error">{formik.errors.roles}</div>
          ) : null}
        </div>

        <button type="submit" disabled={!formik.isValid || !formik.dirty}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default NewUserForm;
