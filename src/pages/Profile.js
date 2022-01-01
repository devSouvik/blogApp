import { auth } from "../firebase-config";
import "./Profile.css";

function Profile({ isAuth }) {
  return (
    <>
      {isAuth && (
        <div className="body">
          <img
            src={auth.currentUser.photoURL}
            alt="User Image"
            className="avatar"
          />
          <p>
            <strong>Name </strong>: {auth.currentUser.displayName}
          </p>
          <p>
            <strong> Email </strong>: {auth.currentUser.email}
          </p>
        </div>
      )}
    </>
  );
}

export default Profile;
