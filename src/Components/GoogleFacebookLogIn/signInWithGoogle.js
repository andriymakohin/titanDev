import React, { useState, useEffect } from 'react';
import { GoogleProvider, GoogleAuth } from './firebase';

export default function SignInWithGoogle() {
  const [state, setState] = useState({
    username: '',
    url: '',
    user: null,
    buttonCheck: false,
  });

  useEffect(() => {
    GoogleAuth.onAuthStateChanged((user) => {
      setState({
        username: user.displayName,
        url: user.photoURL,
        user: user.user,
        buttonCheck: true,
      });
    });
  }, []);

  const handleLogin = () => {
    GoogleAuth.signInWithPopup(GoogleProvider)
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
    GoogleAuth.signOut()
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
        <button id="google-btn" className="button" onClick={handleLogout}>
          <i id="google" class="fab fa-google-plus-g"></i>
          Sign Out
        </button>
      ) : (
        <button id="google-btn" className="button" onClick={handleLogin}>
          <i id="google" class="fab fa-google-plus-g"></i>
          Увійти за допомогою Google
        </button>
      )}
    </div>
  );
}
