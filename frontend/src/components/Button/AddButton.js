import React from 'react';

const AddButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white p-2 rounded"
    >
      Add
    </button>
  );
};

export default AddButton;
