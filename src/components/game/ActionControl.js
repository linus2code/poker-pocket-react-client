import React from 'react';

const ActionControl = () => {
  function raiseHelper(amount, allIn) {}

  function betTenClick() {
    raiseHelper(10, false);
  }

  function betTwentyFiveClick() {
    raiseHelper(25, false);
  }

  function betOneHundredClick() {
    raiseHelper(100, false);
  }

  function betFiveHundredClick() {
    raiseHelper(500, false);
  }

  function betAllInClick() {
    raiseHelper(0, true);
  }

  function foldBtnClick() {}

  function checkBtnClick() {
    // Also handles Call
  }

  function raiseBtnClick() {}

  return (
    // <!-- Bottom controls -->
    <div className="card" style={{ backgroundColor: '#434343', width: '100%', marginTop: '-20px' }}>
      <div className="container" style={{ width: '100%', padding: '10px', marginLeft: '10%' }}>
        <div className="row" style={{ width: '100%' }}>
          <div className="col">
            <button
              onClick={betTenClick}
              type="button"
              className="btn btn-danger"
              style={{ margin: '0 2px' }}
            >
              +10
            </button>
            <button
              onClick={betTwentyFiveClick}
              type="button"
              className="btn btn-danger"
              style={{ margin: '0 2px' }}
            >
              +25
            </button>
            <button
              onClick={betOneHundredClick}
              type="button"
              className="btn btn-danger"
              style={{ margin: '0 2px' }}
            >
              +100
            </button>
            <button
              onClick={betFiveHundredClick}
              type="button"
              className="btn btn-danger"
              style={{ margin: '0 2px' }}
            >
              +500
            </button>
            <button
              onClick={betAllInClick}
              type="button"
              className="btn btn-danger"
              style={{ margin: '0 2px' }}
            >
              All in
            </button>
          </div>
          <div className="col">
            <button
              onClick={foldBtnClick}
              id="foldBtn"
              type="button"
              className="btn btn-danger"
              style={{ margin: '0 2px' }}
            >
              Fold
            </button>
            <button
              onClick={checkBtnClick}
              id="checkBtn"
              type="button"
              className="btn btn-danger"
              style={{ margin: '0 2px' }}
            >
              Check
            </button>
            <button
              onClick={raiseBtnClick}
              id="raiseBtn"
              type="button"
              className="btn btn-danger"
              style={{ margin: '0 2px' }}
            >
              Raise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionControl;
