//@ts-nocheck
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useTitle from "../../Hooks/useTitle";
import { useSelector } from "react-redux";

const Welcome = () => {
  // const { email } = useAuth();
  const user = useSelector((state) => state.user.data) ?? "";

  console.log("user: ", user);

  useTitle(`Yourlaces`);

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome{(user && user.user?.email) ?? ""}!</h1>

      <p>
        <Link to={`/users`}>View techNotes</Link>
      </p>

      <p>
        <Link to="/dash/notes/new">Add New techNote</Link>
      </p>

      {/* {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users">View User Settings</Link>
        </p>
      )}

      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users/new">Add New User</Link>
        </p>
      )} */}
    </section>
  );

  return content;
};
export default Welcome;
