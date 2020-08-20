import React, { useState } from 'react';

function Form({ setNewTodo }) {
  return (
    <input
      type='text'
      onCapt={(e) => setNewTodo(e.target.value)}
      // onSubmitCapture={}
    />
  );
}

export default Form;
