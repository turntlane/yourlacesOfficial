//@ts-nocheck
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Public from "./Components/Public";
import Login from "./Pages/Login/Login";
import DashLayout from "./Components/DashLayout";
import Welcome from "./Features/Auth/Welcome";
import UsersList from "./Pages/Users/UsersList";
import UserProfile from "./Pages/Users/UserProfile";
import EditUser from "./Pages/Users/EditUser";
import NewUserForm from "./Pages/Users/NewUserForm";
import Forum from "./Pages/Forum/Forum";
import Threads from "./Pages/Threads/Threads";
import Prefetch from "./Features/Auth/Prefetch";
import PersistLogin from "./Pages/Login/PersistLogin";
import RequireAuth from "./Features/Auth/RequireAuth";
import { ROLES } from "./Config/roles";
import useTitle from "./Hooks/useTitle";

function App() {
  useTitle("Yourlaces");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route element={<DashLayout />}>
          <Route index element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="forum/:id" element={<Forum />} />
          <Route path="threads/:id" element={<Threads />} />
          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route element={<Prefetch />}>
                {/* <Route path="/" element={<DashLayout />}> */}
                {/* <Route index element={<Welcome />} /> */}

                <Route element={<RequireAuth />}>
                  <Route path="users">
                    {/* <Route index element={<UsersList />} /> */}
                    <Route index element={<UserProfile />} />
                    {/* <Route path=":id" element={<EditUser />} /> */}
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                {/* <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route> */}
                {/* </Route> */}
                {/* End Dash */}
              </Route>
            </Route>
          </Route>
          {/* End Protected Routes */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
