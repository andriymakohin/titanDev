import React, { useState, useEffect } from 'react';
import { FacebookProvider, FacebookAuth } from './firebase';

export default function SignInWithFacebook() {
  const [state, setState] = useState({
    username: '',
    url: '',
    user: null,
    buttonCheck: false,
  });

  useEffect(() => {
    FacebookAuth.onAuthStateChanged((user) => {
      setState({
        username: user.displayName,
        url: user.photoURL,
        user: user.user,
        buttonCheck: true,
      });
    });
  }, []);

  const handleLogin = () => {
    FacebookAuth.signInWithPopup(FacebookProvider)
      .then((result) => {
        setState({
          username: result.user.displayName,
          url: result.user.photoURL,
          user: result.user,
          buttonCheck: true,
        });
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const handleLogout = () => {
    FacebookAuth.signOut()
      .then(() => {
        setState({
          username: '',
          url: '',
          user: null,
          buttonCheck: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {state.user ? (
        <button id="facebook-btn" className="button" onClick={handleLogout}>
          <i id="facebook" class="fab fa-facebook"></i>
          Log Out
        </button>
      ) : (
        <button id="facebook-btn" className="button" onClick={handleLogin}>
          <i id="facebook" class="fab fa-facebook"></i>
          Увійти за допомогою Facebook
        </button>
      )}
    </div>
  );
}
