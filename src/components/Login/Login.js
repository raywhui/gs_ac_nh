import React from "react";
import GoogleSignIn from "../../images/google_sign_in.png";

const Login = (props) => {
  return (
    <>
      <h1 style={{ color: "#d0d0d0" }}>GOONSQUAD</h1>
      <h2 style={{ color: "#d0d0d0" }}>ANIMAL CROSSING</h2>
      <img
        className="googleLoginButton"
        onClick={() => {
          console.log("what");
          props.onClick();
        }}
        style={{ width: 200 }}
        src={GoogleSignIn}
        alt="Google Sign In"
      />
    </>
  );
};

export default Login;
