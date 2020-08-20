import React, { useState } from 'react';
import ToDoList from './ToDoList';
import Form from './Form';

export default function ToDo() {
  const list = new Array(100).fill('').map((title, i) => ({
    id: i,
    title: `ToDo N ${i + 1}`,
  }));

  const setNewTodo = (item) => {
    list.concat(item);
  };

  return (
    <>
      <h1>ToDo list</h1>
      <Form setNewTodo={setNewTodo} />
      <ToDoList list={list} />
    </>
  );
}
