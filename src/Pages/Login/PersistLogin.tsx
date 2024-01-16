//@ts-nocheck
import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "../../Store/Auth/authApiSlice";
import usePersist from "../../Hooks/usePersist";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../../Store/Auth/authSlice";
import { persistor } from "../../Store/store";
import { setUser } from "../../Store/Users/userSlice";
// import PulseLoader from 'react-spinners/PulseLoader'

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const dispatch = useDispatch();

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  console.log("this is the persist login token: ", token);

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          const response = await refresh();
          console.log("idk my brotha", response);
          const { accessToken } = response.data;
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // persist: no
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading");
    content = <div>Loading...</div>;
  } else if (isError) {
    //persist: yes, token: no
    console.log("we arrrrrreeeeeeeee herrrrrrrrereeeeeeeeee");
    dispatch(setUser({ data: null }));
    // persistor.purge();
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <Link to="/login">Please login again uhmx</Link>.
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
