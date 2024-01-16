//@ts-nocheck
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../Store/Auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { persistor, purgeData } from "../Store/store";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "User";
  let isAuthenticated = false;
  // const dispatch = useDispatch();

  console.log("this is token: ", token);

  if (token) {
    const decoded = jwtDecode(token);
    console.log("decoded: ", decoded);
    const { userID, email, roles } = decoded.UserInfo;

    console.log("uhm: ", userID, email, roles);
    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");
    isAuthenticated = true;

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return {
      userID,
      email,
      roles,
      status,
      isAuthenticated,
      isManager,
      isAdmin,
    };
  }

  // persistor.purge();
  // dispatch(setUser())
  console.log("why tf: ", token);
  return {
    userID: null,
    email: "",
    roles: [],
    isAuthenticated,
    isManager,
    isAdmin,
    status,
  };
};
export default useAuth;
