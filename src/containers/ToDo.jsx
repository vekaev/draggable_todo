import React, { useCallback, useState } from 'react';
import 'antd/dist/antd.css';
import Form from './Form';
import update from 'immutability-helper';
import { Card } from './Card';
import { Pagination, Typography } from 'antd';
import nextId from 'react-id-generator';
import styles from './ToDo.module.scss';

const { Title } = Typography;

export default function ToDo() {
  let list;

  if (!list) {
    list = new Array(100).fill('').map((title, i) => ({
      id: nextId(),
      text: `ToDo N ${i + 1} `,
    }));
  }

  const [pageNum, changePageNum] = useState(1);
  const [cards, setCards] = useState(list);

  const addCard = (value) => {
    setCards(
      update(cards, {
        $unshift: [{ id: nextId(), text: value }],
      }),
    );
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      );
    },
    [cards],
  );

  const deleteCard = (i) => {
    setCards(update(cards, { $splice: [[i, 1]] }));
  };

  const indexOfLastPost = pageNum * 10;
  const indexOfFirstPost = indexOfLastPost - 10;
  const currentPosts = cards.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className={styles.todo}>
      <div className={styles.title_part}>
        <Title>Task Manager</Title>
        <Pagination
          simple
          hideOnSinglePage
          defaultCurrent={1}
          total={cards?.length}
          onChange={(page) => changePageNum(page)}
        />
      </div>

      <Form addCard={addCard} />
      {currentPosts.map((card, i) => {
        return (
          <Card
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
            deleteCard={deleteCard}
          />
        );
      })}
    </div>
  );
}
