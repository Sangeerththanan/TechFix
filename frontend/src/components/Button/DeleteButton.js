import React from 'react';

const DeleteButton = ({ onClick }) => {
  return (
    <button
      className="bg-red-500 text-white p-2 rounded ml-2"
      onClick={onClick}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
