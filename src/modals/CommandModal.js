import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { sha3_512 } from 'js-sha3';
import contentContext from '@/context/content/contentContext';

const CommandModal = ({ context, closeModal }) => {
  const { t } = useContext(contentContext);

  const { socketCtx } = context;
  const { socket, connId, socketKey } = socketCtx;

  useEffect(() => {
    if (socket) {
      socket.handle('serverCommandResult', commandRunResult);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const [inputData, setInputData] = useState({
    lineOne: '',
    lineTwo: '',
    lineThree: '',
    password: '',
  });

  function sendServerCommand() {
    if (socket) {
      var password = sha3_512(inputData.password);
      console.log(password);
      const data = JSON.stringify({
        connectionId: connId,
        socketKey: socketKey,
        key: 'serverCommand',
        lineOne: inputData.lineOne,
        lineTwo: inputData.lineTwo,
        lineThree: inputData.lineThree,
        password: password,
      });
      socket.send(data);
    }
  }

  function commandRunResult(jsonData) {
    const cData = jsonData.data;
    if (cData.boolResult) {
      toast.success(cData.command + ' is processed successfully.');
      closeModal();
    } else {
      toast.error(cData.command + ' processing failed.');
    }
  }

  return (
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{t('COMMAND_PROMPT')}</h5>
          <button type="button" className="close" onClick={closeModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <input
            className="form-control"
            autoComplete="off"
            type="text"
            placeholder="/c"
            required
            style={{ marginTop: '5px' }}
            value={inputData.lineOne}
            onChange={(event) =>
              setInputData({
                ...inputData,
                lineOne: event.currentTarget.value,
              })
            }
          />
          <input
            className="form-control"
            autoComplete="off"
            type="text"
            placeholder="/r"
            required
            style={{ marginTop: '5px' }}
            value={inputData.lineTwo}
            onChange={(event) =>
              setInputData({
                ...inputData,
                lineTwo: event.currentTarget.value,
              })
            }
          />
          <input
            className="form-control"
            autoComplete="off"
            type="text"
            placeholder="/p"
            required
            style={{ marginTop: '5px' }}
            value={inputData.lineThree}
            onChange={(event) =>
              setInputData({
                ...inputData,
                lineThree: event.currentTarget.value,
              })
            }
          />
          <input
            className="form-control"
            autoComplete="off"
            type="password"
            placeholder="Password"
            required
            style={{ marginTop: '5px' }}
            value={inputData.password}
            onChange={(event) =>
              setInputData({
                ...inputData,
                password: event.currentTarget.value,
              })
            }
          />
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={sendServerCommand}>
            {t('SEND')}
          </button>
          <button type="button" className="btn btn-secondary" onClick={closeModal}>
            {t('CLOSE')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandModal;
