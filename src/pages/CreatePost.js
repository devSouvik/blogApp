import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
// mui imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  helperText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  labelText: {
    color: "black",
    fontWeight: "bold",
  },
});

function CreatePost({ isAuth }) {
  const [postText, setPostText] = useState("");
  const [title, setTitle] = useState("");
  let navigate = useNavigate();

  const finaldata = parse(postText);

  const handleChange = (event, editor) => {
    let data = editor.getData();
    setPostText(data);
    console.log(data);
  };

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

  const classes = useStyles();

  return (
    // <div className="createPostPage">
    //   <div className="cpContainer">
    //     <h1>Create a post</h1>
    //     <div className="inputGp">
    //       <label>Title : </label>
    //       <input
    //         placeholder="Title ..."
    // onChange={(event) => {
    //   setTitle(event.target.value);
    // }}
    //       />
    //     </div>
    //     <div className="inputGp">
    //       <label>Text : </label>
    //       <textarea
    //         placeholder="Body ..."
    //         onChange={(event) => {
    //           setPostText(event.target.value);
    //         }}
    //       />
    //     </div>
    // <button onClick={createPost}>Submit</button>
    //   </div>
    // </div>

    <>
      <div className="container">
        <h1 className="articleHeading">Write your story here . . .</h1>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            fullWidth
            label="Story Title"
            id="storyTitle"
            InputLabelProps={{
              className: classes.labelText,
            }}
            FormHelperTextProps={{
              className: classes.helperText,
            }}
            onChange={(event) => {
              setTitle(event.target.value);
              console.log(title);
            }}
          />
        </Box>
        <div style={{ marginTop: 15 }}>
          <CKEditor editor={ClassicEditor} onChange={handleChange} />
        </div>
      </div>

      <Button
        variant="contained"
        style={{ float: "right", marginRight: "5%", marginTop: 20 }}
        onClick={createPost}
      >
        Submit Post
      </Button>
    </>
  );
}

export default CreatePost;
