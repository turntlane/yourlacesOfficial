//@ts-nocheck
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetThreadsByPostIDQuery } from "../../Store/Threads/threadApiSlice";
import useTitle from "../../Hooks/useTitle";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { useAddPostMutation } from "../../Store/Threads/threadApiSlice";
import { CommentBox } from "../../Components/CommentBox/CommentBox";
import { useCurrentEditor, useEditor } from "@tiptap/react";
import { setFips } from "crypto";

const Threads = () => {
  useTitle("Threads");
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  const { state } = useLocation();
  const { post, postID } = state ?? id;
  const {
    data: threads,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetThreadsByPostIDQuery(postID ?? id, {
    refetchOnMountOrArgChange: true,
  });
  const user = useSelector((state) => state?.user?.data?.user);
  const [imageFiles, setImageFiles] = useState([]);

  const [addPost] = useAddPostMutation();

  const [descContent, setDescContent] = useState("");
  const [description, setDescription] = useState("");
  // const [formDataContent, setFormDataContent] = useState({
  //   username: user.username,
  //   postID: postID ?? id,
  //   userID: user.userID,
  //   parentCommentID: postID ?? id,
  // });
  // useEffect(() => {
  //   console.log("this is the formDataContent: ", formDataContent);
  // }, [description, formDataContent]);

  const submit = async (event) => {
    event.preventDefault();
    const commentData = {
      username: user.username,
      content: description,
      postID: postID ?? id,
      userID: user.userID,
      parentCommentID: postID ?? id,
    };

    console.log("this is the commentData: ", commentData);
    const formData = new FormData();
    formData.append("username", commentData.username);
    formData.append("content", commentData.content);
    formData.append("postID", commentData.postID.toString()); // Assuming postID is a number
    formData.append("userID", commentData.userID.toString()); // Assuming userID is a number
    if (commentData.parentCommentID !== null) {
      formData.append(
        "parentCommentID",
        commentData.parentCommentID.toString()
      );
    }
    [...imageFiles].forEach((f) => {
      formData.append("images", f);
    });
    await addPost(formData).unwrap();
    setDescription("");
    setImageFiles([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(`Form submitted, ${descContent}`);
  };

  if (state.post.comments.length < 1) {
    return (
      <>
        <div style={{ outline: "1px solid" }}>
          <strong>{post.testuser.username}</strong>

          <h1>{post.title}</h1>
          <strong>{post.content}</strong>
        </div>
        {/* NEED TO MAKE THIS A LOGIN MODAL EVENTUALLY */}
        {isAuthenticated ? (
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => setDescContent(e.target.value)}
              value={descContent}
            ></input>
            <button type="submit">Click to submit</button>
          </form>
        ) : (
          <Link to={"/login"}>Login here to reply</Link>
        )}
      </>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts.</div>;
  }
  return (
    <div>
      <div style={{ outline: "1px solid" }}>
        <strong>{post.testuser.username}</strong>
        <h1>{post.title}</h1>
        <strong>{post.content}</strong>
      </div>
      <h3>Comments</h3>
      {threads &&
        threads.comments.map((comment) => (
          <div key={comment.commentID} style={{ outline: "1px solid" }}>
            <div>{comment.testuser.username}</div>
            <div>{comment.content}</div>
            {/* <button onClick={() => console.log(comment.commentImageUrls)}>
              button
            </button> */}
            {comment.commentImageUrls.length > 0 &&
              comment.commentImageUrls.map((c) => (
                <>
                  <img src={c} alt="Yourlaces" />
                </>
              ))}
          </div>
        ))}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit}>
          <input
            multiple
            onChange={(e) => setDescContent(e.target.value)}
            value={descContent}
          ></input>
          <button type="submit">Click to submit</button>
        </form>
      ) : (
        <Link to={"/login"}>Login here to reply</Link>
      )}
      <CommentBox
        // setDescription={() =>
        //   setDescription((prev) => ({
        //     ...prev,
        //     content: description,
        //   }))
        // }
        setDescription={setDescription}
      />
      <form onSubmit={submit}>
        <input
          onChange={(e) => setImageFiles(e.target.files)}
          multiple
          type="file"
          accept="image/*"
        ></input>
        <button type="submit">Submit</button>
      </form>
      {imageFiles.length > 0 && (
        <div>
          <h3>Selected Files:</h3>
          <ul>
            {Array.from(imageFiles).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const memoizedUser = memo(Threads);

export default memoizedUser;
