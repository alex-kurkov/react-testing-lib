import { render, screen } from '@testing-library/react';
import { List } from 'src/components/List';

it('отображение списка задач', () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  const items: Task[] = [
    {
      id: '1',
      header: 'купить хлеб',
      done: false,
    },
    {
      id: '2',
      header: 'купить молоко',
      done: false,
    },
    {
      id: '3',
      header: 'выгулять собаку',
      done: true,
    },
  ];

  const { rerender, asFragment } = render(
    <List items={items} onDelete={onDelete} onToggle={onToggle} />
  );
  const firstRender = asFragment();

  items.pop();

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
  const secondRender = asFragment();

  expect(firstRender).toMatchDiffSnapshot(secondRender);
});

it('Список содержит не больше 10 невыполненных задач', () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  const items: Task[] = [
    {
      id: '1',
      header: 'задача 1',
      done: false,
    },
    {
      id: '2',
      header: 'задача 2',
      done: false,
    },
    {
      id: '3',
      header: 'задача 3',
      done: true,
    },
    {
      id: '4',
      header: 'задача 4',
      done: false,
    },
    {
      id: '5',
      header: 'задача 5',
      done: false,
    },
    {
      id: '6',
      header: 'задача 6',
      done: false,
    },
    {
      id: '7',
      header: 'задача 7',
      done: false,
    },
    {
      id: '8',
      header: 'задача 8',
      done: false,
    },
    {
      id: '9',
      header: 'задача 9',
      done: false,
    },
    {
      id: '10',
      header: 'задача 10',
      done: false,
    },
  ];

  
});
