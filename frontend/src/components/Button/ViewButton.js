import React from 'react';

const ViewButton = ({ onClick, label}) => {
  return (
    <button
      className="bg-green-500 text-white p-2 rounded-full absolute left-4 bottom-4 w-40"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ViewButton;
