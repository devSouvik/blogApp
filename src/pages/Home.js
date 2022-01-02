import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import Typography from "@mui/material/Typography";

function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);
  // const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    // console.log(postList);
    setPostList((previous) => previous.filter((value) => value.id !== id)); // automatically state updated after every post deletion
  };

  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div
              className="postTextContainer"
              dangerouslySetInnerHTML={{ __html: post.postText }} //formats html tags to normal text
            />
            <Typography
              style={{ fontSize: "1rem", color: "#6c757d", marginTop: 10 }}
              color="text.secondary"
            >
              - Written by &nbsp;
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                {post.author.name}
              </span>
            </Typography>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
