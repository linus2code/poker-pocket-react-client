import React from 'react';
// import styled from 'styled-components';

const CommandModal = () => {
  return (
    <>
      <input
        id="cmdCommandLineOne"
        className="form-control"
        autoComplete="off"
        type="text"
        placeholder="/c"
        required
        style={{ marginTop: '5px' }}
      />
      <input
        id="cmdCommandLineTwo"
        className="form-control"
        autoComplete="off"
        type="text"
        placeholder="/r"
        required
        style={{ marginTop: '5px' }}
      />
      <input
        id="cmdCommandLineThree"
        className="form-control"
        autoComplete="off"
        type="text"
        placeholder="/p"
        required
        style={{ marginTop: '5px' }}
      />
      <input
        id="cmdPassword"
        className="form-control"
        autoComplete="off"
        type="password"
        placeholder="Password"
        required
        style={{ marginTop: '5px' }}
      />
    </>
  );
};

export default CommandModal;
