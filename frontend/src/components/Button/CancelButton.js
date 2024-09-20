import React from 'react';

const CancelButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-500 text-white p-2 rounded ml-2"
    >
      Cancel
    </button>
  );
};

export default CancelButton;
