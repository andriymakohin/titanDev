import React from "react";
import { GoogleLogin } from "react-google-login";
import { setToken, setUserInfo } from "../../redux/slice";
import { useDispatch } from "react-redux";

import styles from "./Login.module.scss";


const CLIENT_ID =
  // "103633925093-14i76rmintbq72196nfi2344cf2nko2p.apps.googleusercontent.com";
  "103633925093-knsdgjt9l80fe7kjqq5camlg351quq1r.apps.googleusercontent.com"
const errorLogin = (response) => {
  console.log(response);
};

const {
  fons,
  container,
  siginUpTitel,
  btnContainer,
  btnContainer__formBtn
} = styles;

const Login = () => {
  const dispatch = useDispatch();
  const loginSuccessGoogle = (response) => {
    console.log(response)
    dispatch(setToken(response.accessToken));
    dispatch(
      setUserInfo({
        name: response.profileObj.name,
        status: true,
        photo: response.profileObj.imageUrl,
      })
    );
  };

  return (
    <>
    <div className={fons}>
      <div className={container}>
        <h1 className={siginUpTitel}>Привіт, друже!</h1>
        <p className={siginUpTitel}>
          Для того, щоб почати користуватись додатком пройди коротку реєстацію😉
        </p>
        <div className={btnContainer}>
          <GoogleLogin
            render={renderProps => (
              <button className={btnContainer__formBtn} onClick={renderProps.onClick} disabled={renderProps.disabled}>Вхід</button>
            )}
            clientId={CLIENT_ID}
            buttonText="Login with google"
            onSuccess={loginSuccessGoogle}
            onFailure={errorLogin}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;
