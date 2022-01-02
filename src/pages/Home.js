import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
// import ReactHtmlParser from "react-html-parser";

function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);
  // const postsCollectionRef =;

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
    setPostList((previous) => previous.filter((value) => value.id !== id));
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
              dangerouslySetInnerHTML={{ __html: post.postText }}
            />
            {/* </div> */}
            <h3>@{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
