import React from 'react';

const AddButton = ({ onClick, label }) => {
  return (
    <button type="submit" 
    className="bg-blue-500 text-white p-2 rounded"
    onClick={onClick}
    >
      {label}
    </button>
  );
};

export default AddButton;
