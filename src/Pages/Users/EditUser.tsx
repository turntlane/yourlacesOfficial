//@ts-nocheck
import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import { useGetUsersQuery } from "../../Store/Users/usersApiSlice";
// import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from "../../Hooks/useTitle";

const EditUser = () => {
  useTitle("techNotes: Edit User");

  const { id } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user) return <div>Loading...</div>;

  const content = <EditUserForm user={user} />;

  return content;
};
export default EditUser;
