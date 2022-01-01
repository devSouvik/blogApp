import { auth } from "../firebase-config";
import "./Profile.css";

function Profile({ isAuth }) {
  return (
    <>
      {isAuth && (
        <div class="card">
          <img src={auth.currentUser.photoURL} style={{ width: "100%" }} />
          <div class="container">
            <h4>
              <b>{auth.currentUser.displayName}</b>
            </h4>
            <p>{auth.currentUser.email}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
