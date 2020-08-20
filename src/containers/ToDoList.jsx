import React, { useState } from 'react';

function ToDoList({ list }) {
  // const [newTodo, setNewTodo] = useState('');
  return (
    <ul>
      {list.map((item) => {
        console.log(item);
        return <li key={item.id}>{item.title}</li>;
      })}
    </ul>
  );
}

export default ToDoList;
