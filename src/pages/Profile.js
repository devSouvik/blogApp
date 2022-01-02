import { auth } from "../firebase-config";
import "./Profile.css";

function Profile({ isAuth }) {
  return (
    <>
      {isAuth && (
        <div className="card">
          <img
            src={auth.currentUser.photoURL}
            style={{
              width: "50%",
              borderRadius: "50%",
              marginTop: "10%",
              marginBottom: "8%",
            }}
          />
          <div className="container">
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
