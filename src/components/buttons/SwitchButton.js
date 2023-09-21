import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.div`
  color: #ffffff;
  margin-left: -20px;
  font-size: 13px;
`;

const SwitchButton = ({ children, onChange, label, name, onText, offText }) => {
  return (
    <>
      <StyledLabel>{label}</StyledLabel>
      <div className="row">
        <input
          type="checkbox"
          name={name}
          data-on-color="danger"
          data-off-color="danger"
          data-on-text={onText ? onText : 'Off'}
          data-off-text={offText ? offText : 'On'}
          data-size="small"
          data-label-width="0"
          onChange={onChange}
        />
        {children}
      </div>
    </>
  );
};

export default SwitchButton;
