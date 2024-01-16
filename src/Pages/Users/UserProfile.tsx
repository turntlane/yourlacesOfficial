//@ts-nocheck
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetPostsByUserIDQuery } from "../../Store/Posts/postApiSlice";

const UserProfile = () => {
  const user = useSelector((state) => state?.user?.data?.user);
  console.log("weeeeeeeeeeeee: ", user);

  const userID = user ? user.userID : "invalid-user-id";
  const {
    data: posts,
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIDQuery(userID, {
    skip: !user,
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  console.log("is there an error in user profile?: ", isError);

  // Render logic based on user and posts states
  if (!user) {
    return <div>User not found.</div>;
  }

  if (isUninitialized || isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts. {error?.message}</div>;
  }

  const content = (
    <div>
      {posts &&
        posts.posts.map((post) => (
          <div key={post.postID}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
    </div>
  );

  return (
    <div>
      <div>{user.username}</div>
      {/* ... other user details */}
      {content}
    </div>
  );
};

const memoizedUser = memo(UserProfile);

export default memoizedUser;
