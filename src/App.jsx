import React from 'react';
import ToDo from './containers/ToDo';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ToDo />
    </DndProvider>
  );
}
