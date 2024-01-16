// import { store } from "../../app/store";
import { postApiSlice } from "../../Store/Posts/postApiSlice";
import { store } from "../../Store/store";
import { usersApiSlice } from "../../Store/Users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    // store.dispatch(
    //   notesApiSlice.util.prefetch("getNotes", "notesList", { force: true })
    // );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
    store.dispatch(
      postApiSlice.util.prefetch("getPosts", "postsList", { force: true })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
