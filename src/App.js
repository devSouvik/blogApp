import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signuUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {!isAuth ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            {/* <button onClick={signuUserOut}>Sign Out</button> */}
            <span onClick={signuUserOut} className="signOut">
              Sign out
            </span>
            <Link to="/createpost">Create Post</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" exact element={<Home isAuth={isAuth} />}></Route>
        <Route
          path="/login"
          exact
          element={<Login setIsAuth={setIsAuth} />}
        ></Route>
        <Route
          path="/createpost"
          exact
          element={<CreatePost isAuth={isAuth} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
