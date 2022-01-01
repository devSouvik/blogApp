import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  const [postText, setPostText] = useState("");
  const [title, setTitle] = useState("");
  let navigate = useNavigate();

  const postsCollectionRef = collection(db, "posts");

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create a post</h1>
        <div className="inputGp">
          <label>Title : </label>
          <input
            placeholder="Title ..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Text : </label>
          <textarea
            placeholder="Body ..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button onClick={createPost}>Submit</button>
      </div>
    </div>
  );
}

export default CreatePost;
