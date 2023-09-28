import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { sha3_512 } from 'js-sha3';
import authContext from '@/context/auth/authContext';
import SignInView from './SignInModal';
import SignOnView from './SignOnModal';

const SignInOnModal = ({ mode, context, closeModal }) => {
  const { setIsLoggedIn } = useContext(authContext);

  const [state, setState] = useState(mode);

  const { socketCtx } = context;
  const { socket, connId, socketKey, reconnect } = socketCtx;

  const regAuthHandler = (socket) => {
    socket.handle('accountCreated', (jsonData) => accountCreated(jsonData.data));

    socket.handle('loginResult', (jsonData) => loginResult(jsonData.data));
  };

  useEffect(() => {
    if (socket) {
      regAuthHandler(socket);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  function accountCreated(aData) {
    if (aData.result) {
      toast.success('Account successfully created, you can now login.');
      // modalAnimate($formRegister, $formLogin);
      // $('#register_username').val('');
      // $('#register_password').val('');
      // $('#register_email').val('');
      closeModal();
    } else {
      toast.error('Account already exists. Please try another one.');
    }
  }

  function loginResult(lData) {
    if (lData.result) {
      console.log(JSON.stringify(lData));
      toast.success('You are now logged in for this instance.');
      setIsLoggedIn({
        username: lData.username,
        password: lData.password,
      });
      reconnect(); // Need to get all room's again
      closeModal();
    } else {
      toast.error('Login failed! Check your username and password.');
    }
  }

  function forgotPasswordBtn() {
    window.location.href = 'http://www.nitramite.com/contact.html';
  }

  function userLogin(username, password) {
    // SHA3-512
    var passwordSha3 = sha3_512(password);
    console.log('Login hash: ' + passwordSha3);
    if (socket) {
      socket.send(
        JSON.stringify({
          connectionId: connId,
          socketKey: socketKey,
          key: 'userLogin',
          name: username,
          password: passwordSha3,
        })
      );
    }
  }

  function createAccount(username, password, email) {
    // SHA3-512
    var passwordSha3 = sha3_512(password);
    console.log('RegisterHash: ' + passwordSha3);
    if (socket) {
      socket.send(
        JSON.stringify({
          connectionId: connId,
          socketKey: socketKey,
          key: 'createAccount',
          name: username,
          password: passwordSha3,
          email: email,
        })
      );
    }
  }

  return (
    <div>
      {state === 0 ? (
        <SignInView
          userLogin={userLogin}
          setState={setState}
          forgotPasswordBtn={forgotPasswordBtn}
          closeModal={closeModal}
        />
      ) : (
        <SignOnView
          createAccount={createAccount}
          setState={setState}
          forgotPasswordBtn={forgotPasswordBtn}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default SignInOnModal;
