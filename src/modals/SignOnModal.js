import React, { useContext } from 'react';
// import styled from 'styled-components';
import contentContext from '@/context/content/contentContext';

const SignOnModal = () => {
  const { t } = useContext(contentContext);
  function forgotPasswordBtn() {}

  return (
    <>
      <div id="div-forms">
        {/* <!-- Begin | Register Form --> */}
        <form id="register-form" style={{ display: 'none' }}>
          <div id="div-register-msg" style={{ marginLeft: '2px' }}>
            <span id="text-register-msg">Register Poker Pocket account.</span>
          </div>
          <input
            id="register_username"
            className="form-control"
            type="text"
            placeholder="Username"
            required
            style={{ marginTop: '5px' }}
          />
          <input
            id="register_password"
            className="form-control"
            type="password"
            placeholder="Password"
            required
            style={{ marginTop: '5px' }}
          />
          <input
            id="register_email"
            className="form-control"
            type="email"
            placeholder="Email"
            required
            style={{ marginTop: '5px' }}
          />
          <div className="modal-footer">
            <div>
              <button className="btn btn-primary btn-md btn-block">{t('REGISTER')}</button>
            </div>
            <div>
              <button id="register_login_btn" type="button" className="btn btn-default">
                Log In
              </button>
              <button
                id="register_lost_btn"
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

export default SignOnModal;
