import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Features/Auth/Login";
import Register from "./Pages/Register";
import Layout from "./Components/Layout";
import DashLayout from "./Components/DashLayout";
import Welcome from "./Features/Auth/Welcome";
import Users from "./Features/Users/Users";
import UsersList from "./Features/Users/UsersList";
import EditUser from "./Features/Users/EditUser";
import NewUserForm from "./Features/Users/NewUserForm";
import Prefetch from "./Features/Auth/Prefetch";

function App() {
  return (
    // <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashLayout />}>
            <Route index element={<Welcome />} />

            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":id" element={<EditUser />} />
              <Route path="new" element={<NewUserForm />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
    // </Router>
  );
}

export default App;
