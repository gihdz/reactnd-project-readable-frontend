import React from 'react';
import ReactLoading from 'react-loading';

export default ({ show }) => {
  if (!show) return false;
  return <ReactLoading color="#000" width={30} height={30} />;
};
