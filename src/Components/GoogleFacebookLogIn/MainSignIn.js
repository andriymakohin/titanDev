
import React from "react";
import SignInWithGoogle from "./signInWithGoogle";
import SignInWithFacebook from "./signInWithFacebook";


function UserLogin() {
  return (
    <div className="UserLogin">

      <SignInWithGoogle />
      <SignInWithFacebook />

    </div>
  );
}

export default UserLogin;
