import React, { useState } from 'react';
import styled from 'styled-components';

const StyledSwitch = styled.div`
  .switch-label {
    color: #ffffff;
    margin-left: -20px;
    font-size: 13px;
  }

  .switch-vision {
    display: inline-block;
    direction: ltr;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #ccc;
    position: relative;
    text-align: left;
    overflow: hidden;
    line-height: 8px;
    z-index: 0;
    user-select: none;
    vertical-align: middle;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  }

  .switch-vision::focus {
    border: 2px solid #66afe9;
  }
  .switch-checkbox {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .switch-container {
    display: inline-flex;
    border-radius: 4px;
    transform: translate3d(0, 0, 0);
  }
  .switch-container.swtich-animate {
    transition: margin-left 0.5s;
  }

  .switch-text-left,
  .switch-text-right,
  .switch-text-sep {
    box-sizing: border-box;
    cursor: pointer;
    display: table-cell;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 20px;
  }
  .switch-text-sep {
    text-align: center;
    margin-top: -1px;
    margin-bottom: -1px;
  }

  .sep-color {
    color: #333;
    background: #444;
  }
  .text-color {
    color: #ffffff;
    background: #d9534f;
  }
  .switch-container.switch-right {
    margin-left: 0px;
  }

  .switch-vision.sm {
    width: 62px;
  }
  .switch-vision.sm .switch-container {
    width: 100px;
  }
  .switch-vision.sm .switch-text-left,
  .switch-vision.sm .switch-text-right {
    width: 38px;
    height: 30px;
  }
  .switch-vision.sm .switch-text-sep {
    width: 20px;
  }
  .switch-vision.sm .switch-container.switch-on {
    margin-left: -37.9px;
  }
  .switch-vision.sm .switch-text-left,
  .switch-vision.sm .switch-text-right,
  .switch-vision.sm .switch-text-sep {
    font-size: 12px;
    line-height: 1.5;
  }
`;

const SwitchButton = (props) => {
  const { id, value, onChange, label, onText, onColor, offText, offColor, sepText, sepColor } =
    props;

  const [state, setState] = useState(value ?? false);

  const onChangeState = (event) => {
    const newVal = event.target.checked;
    setState(newVal);
    if (onChange) {
      onChange(newVal);
    }
  };

  const size = 'sm';

  return (
    <StyledSwitch>
      <div className="switch-label" htmlFor={id}>
        {label}
      </div>
      <div className="row">
        <div className={`switch-vision ${size}`}>
          <div className={`switch-container swtich-animate ${state ? 'switch-on' : 'switch-off'}`}>
            <span className={`switch-text-left ${onColor ? onColor : 'text-color'}`}>
              {offText}
            </span>
            <span className={`switch-text-sep ${sepColor ? sepColor : 'sep-color'}`}>
              {sepText}
            </span>
            <span className={`switch-text-right ${offColor ? offColor : 'text-color'}`}>
              {onText}
            </span>
            <input
              className="switch-checkbox"
              id={id}
              type="checkbox"
              value={state}
              onChange={onChangeState}
            />
          </div>
        </div>
      </div>
    </StyledSwitch>
  );
};

export default SwitchButton;
