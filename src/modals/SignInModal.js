import React, { useState, useContext } from 'react';
import contentContext from '@/context/content/contentContext';

const SignInView = ({ closeModal, userLogin, setState, forgotPasswordBtn }) => {
  const { t } = useContext(contentContext);

  const [inputData, setInputData] = useState({
    lg_username: '',
    lg_password: '',
  });
  const [tipMsg, setTipMsg] = useState('Give your Poker Pocket account username and password.');

  const form_submit = () => {
    setTipMsg('Logging in...');
    userLogin(inputData.lg_username, inputData.lg_password);
  };

  const forgotPassword = (event) => {
    event.preventDefault();
    forgotPasswordBtn();
  };

  return (
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{t('LOGIN')}</h5>
          <button
            type="button"
            className="close"
            onClick={closeModal}
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div id="div-forms1">
            {/* <!-- Begin # Login Form --> */}
            <form id="login-form" onSubmit={form_submit}>
              <div style={{ marginLeft: '2px' }}>
                <span>{tipMsg}</span>
              </div>
              <input
                id="login_username"
                className="form-control"
                type="text"
                placeholder="Username"
                required
                style={{ marginTop: '5px' }}
                value={inputData.lg_username}
                onChange={(event) =>
                  setInputData({
                    ...inputData,
                    lg_username: event.currentTarget.value,
                  })
                }
              />
              <input
                id="login_password"
                className="form-control"
                type="password"
                placeholder="Password"
                required
                style={{ marginTop: '5px' }}
                value={inputData.lg_password}
                onChange={(event) =>
                  setInputData({
                    ...inputData,
                    lg_password: event.currentTarget.value,
                  })
                }
              />
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <div>
            <button className="btn btn-primary btn-md btn-block" onClick={form_submit}>
              {t('LOGIN')}
            </button>
          </div>
          <div>
            <button
              id="login_register_btn"
              type="button"
              className="btn btn-default"
              onClick={() => {
                setState(1);
              }}
            >
              {t('REGISTER')}
            </button>
            <button type="button" className="btn btn-default" onClick={forgotPassword}>
              {t('Forgot password?')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInView;
