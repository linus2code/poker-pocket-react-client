import React, { useContext } from 'react';
// import styled from 'styled-components';
import contentContext from '@/context/content/contentContext';

const SignInModal = () => {
  const { t } = useContext(contentContext);

  function forgotPasswordBtn() {}

  return (
    <>
      <div id="div-forms">
        {/* <!-- Begin # Login Form --> */}
        <form id="login-form">
          <div id="div-login-msg" style={{ marginLeft: '2px' }}>
            <span id="text-login-msg">Give your Poker Pocket account username and password.</span>
          </div>
          <input
            id="login_username"
            className="form-control"
            type="text"
            placeholder="Username"
            required
            style={{ marginTop: '5px' }}
          />
          <input
            id="login_password"
            className="form-control"
            type="password"
            placeholder="Password"
            required
            style={{ marginTop: '5px' }}
          />
          <div className="modal-footer">
            <div>
              <button className="btn btn-primary btn-md btn-block">Login</button>
            </div>
            <div>
              <button id="login_register_btn" type="button" className="btn btn-default">
                {t('REGISTER')}
              </button>
              <button
                id="login_lost_btn"
                type="button"
                className="btn btn-default"
                onClick={() => forgotPasswordBtn()}
              >
                Forgot password?
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInModal;
