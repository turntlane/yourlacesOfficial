//@ts-nocheck
import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./Store/actions/authActions";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register";
import Layout from "./Components/Layout";
// import DashLayout from "./Components/DashLayout";
import Welcome from "./Features/Auth/Welcome";
import Users from "./Pages/Users/Users";
import UsersList from "./Pages/Users/UsersList";
import EditUser from "./Pages/Users/EditUser";
import NewUserForm from "./Pages/Users/NewUserForm";
import Prefetch from "./Features/Auth/Prefetch";
// import PersistLogin from "./Store/Auth/PersistLogin";

function App() {
  const dispatch = useDispatch();
  const { accessToken, refreshToken: storedRefreshToken } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (storedRefreshToken && !accessToken) {
      dispatch(refreshToken(storedRefreshToken));
    }
  }, [storedRefreshToken, accessToken, dispatch]);
  return (
    // <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route element={<PersistLogin />}> */}
        <Route element={<Prefetch />}>
          {/* <Route path="dash" element={<DashLayout />}> */}
          <Route index element={<Welcome />} />

          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path=":id" element={<EditUser />} />
            <Route path="new" element={<NewUserForm />} />
          </Route>
        </Route>
      </Route>
      {/* </Route> */}
      {/* </Route> */}
    </Routes>
    // </Router>
  );
}

export default App;
