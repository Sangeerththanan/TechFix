import React from 'react';

const UpdateButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-yellow-500 text-white p-2 rounded"
    >
      Update
    </button>
  );
};

export default UpdateButton;
