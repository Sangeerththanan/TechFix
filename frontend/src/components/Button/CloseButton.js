import React from 'react';

const CloseButton = ({ onClick}) => {
  return (
    <button
      className="bg-blue-500 text-white p-2 rounded"
      onClick={onClick}
    >
      Close
    </button>
  );
};

export default CloseButton;
