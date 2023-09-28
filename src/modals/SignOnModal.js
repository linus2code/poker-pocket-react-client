import React, { useState, useContext } from 'react';
import contentContext from '@/context/content/contentContext';

const SignOnModal = ({ closeModal, createAccount, setState, forgotPasswordBtn }) => {
  const { t } = useContext(contentContext);

  const [inputData, setInputData] = useState({
    rg_username: '',
    rg_password: '',
    rg_email: '',
  });
  const [tipMsg, setTipMsg] = useState('Register Poker Pocket account.');

  const form_submit = () => {
    if (String(inputData.rg_password).length > 5) {
      setTipMsg('Creating account...');
      createAccount(inputData.rg_username, inputData.rg_password, inputData.rg_email);
    } else {
      setTipMsg('Password must be longer than five characters.');
    }
  };

  const forgotPassword = (event) => {
    event.preventDefault();
    forgotPasswordBtn();
  };

  return (
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{t('REGISTER')}</h5>
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
          <div id="div-forms2">
            {/* <!-- Begin | Register Form --> */}
            <form id="register-form" onSubmit={form_submit}>
              <div id="div-register-msg" style={{ marginLeft: '2px' }}>
                <span id="text-register-msg">{tipMsg}</span>
              </div>
              <input
                id="register_username"
                className="form-control"
                type="text"
                placeholder="Username"
                required
                style={{ marginTop: '5px' }}
                value={inputData.rg_username}
                onChange={(event) =>
                  setInputData({
                    ...inputData,
                    rg_username: event.currentTarget.value,
                  })
                }
              />
              <input
                id="register_password"
                className="form-control"
                type="password"
                placeholder="Password"
                required
                style={{ marginTop: '5px' }}
                value={inputData.rg_password}
                onChange={(event) =>
                  setInputData({
                    ...inputData,
                    rg_password: event.currentTarget.value,
                  })
                }
              />
              <input
                id="register_email"
                className="form-control"
                type="email"
                placeholder="Email"
                required
                style={{ marginTop: '5px' }}
                value={inputData.rg_email}
                onChange={(event) =>
                  setInputData({
                    ...inputData,
                    rg_email: event.currentTarget.value,
                  })
                }
              />
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <div>
            <button className="btn btn-primary btn-md btn-block" onClick={form_submit}>
              {t('REGISTER')}
            </button>
          </div>
          <div>
            <button
              id="register_login_btn"
              type="button"
              className="btn btn-default"
              onClick={() => {
                setState(0);
              }}
            >
              {t('Log In')}
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

export default SignOnModal;
