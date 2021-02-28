import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style = { {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"} }
      alt="Loading..."
    />
  </Fragment>
);

export default Spinner;
