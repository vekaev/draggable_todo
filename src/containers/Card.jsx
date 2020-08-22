import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/ItemTypes';
import styles from './Card.module.scss';

export const Card = ({ id, text, index, moveCard, deleteCard }) => {
  const [value, setValue] = useState(text);
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  const handleChange = (value) =>
    value && value !== '' ? setValue(value) : deleteCard(index);
  return (
    <div
      className={`${styles.card} ${isDragging ? styles.active : ''}`}
      ref={ref}
    >
      <input
        type='text'
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        // onKeyPress={}
        className={styles.todoName}
      />
      <button className={styles.delete} onClick={() => deleteCard(index)}>
        Delete
      </button>
    </div>
  );
};
