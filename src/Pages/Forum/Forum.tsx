//@ts-nocheck
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetPostsByCategoryIDQuery } from "../../Store/Posts/postApiSlice";
import useTitle from "../../Hooks/useTitle";

const Forum = () => {
  useTitle("Forum");
  const { id } = useParams();
  const { state } = useLocation();
  const { categoryID } = state ?? id;

  console.log("param id:", id);
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByCategoryIDQuery(categoryID ?? id, {
    // pollingInterval: 60000,
    // refetchOnFocus: true,
    // refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();

  const onThreadPress = (originalPost, postID) => {
    // Navigate to the new page. The URL structure depends on your routing setup
    navigate(`/threads/${postID}`, {
      state: { post: originalPost, postID: postID },
    }); // For v6, use navigate(`/category/${categoryName}`);
  };

  // console.log("weeeewoooo", posts.posts);

  // posts &&
  //   console.log(
  //     "post comments length: ",
  //     posts.posts.map((c) => c.comments.length)
  //   );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts.</div>;
  }
  return (
    //   <tr className="table__row user">
    //     <td className={`table__cell ${cellStatus}`}>{user.username}</td>
    //     <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
    //     <td className={`table__cell ${cellStatus}`}>
    //       <div>helllllo</div>
    //       <button className="icon-button table__button" onClick={handleEdit}>
    //         <FontAwesomeIcon icon={faPenToSquare} />
    //       </button>
    //     </td>
    //   </tr>
    <div>
      {/* <div>{username}</div>
      <div>{email}</div>
      <div>{contactInfo ?? "Empty"}</div>
      <div>{userRating}</div>
      <div>{createdAt}</div> */}
      {/* {data && data.posts.map((p) => <div>{p}</div>)} */}
      {posts &&
        posts.posts.map((post) => (
          <div key={post.postID}>
            <button
              onClick={() => {
                // console.log("dis post: ", post);
                onThreadPress(post, post.postID);
              }}
            >
              <h1>{post.testuser.username}</h1>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </button>
            <div>{post.comments.length}</div>
            {/* {post.comments &&
              post.comments.map((comment) => (
                <div key={comment.commentID}>
                  Comment
                  <strong>
                    <div key={comment.commentID}>{comment.length}</div>
                  </strong>
                </div>
              ))} */}
          </div>
        ))}
    </div>
  );
  //   } else return null;
};

const memoizedUser = memo(Forum);

export default memoizedUser;
