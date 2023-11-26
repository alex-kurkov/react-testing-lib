import { prettyDOM, render, screen, within } from '@testing-library/react';
import ue from '@testing-library/user-event';
import { Item } from 'src/components/Item';

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

const doneItem = {
  id: '1',
  header: 'купить хлеб',
  done: true,
};
const undoneItem = {
  id: '2',
  header: 'купить молоко',
  done: false,
};

describe('Элемент списка задач', () => {
  it('название не должно быть больше 32 символов', () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    expect(() =>
      render(
        <Item
          {...undoneItem}
          header="очень длинный заголовок более тридцати двух символов"
          onDelete={onDelete}
          onToggle={onToggle}
        />
      )
    ).toThrowError('длина заголовка должна быть от 1 до 32 символов');
  });
  it('название не должно быть пустым', () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();
    expect(() =>
      render(
        <Item
          {...undoneItem}
          header=""
          onDelete={onDelete}
          onToggle={onToggle}
        />
      )
    ).toThrowError('длина заголовка должна быть от 1 до 32 символов');
  });
  it('нельзя удалять невыполненные задачи', async () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();
    render(<Item {...undoneItem} onDelete={onDelete} onToggle={onToggle} />);

    const deleteBtnEl = screen.getByRole('button');

    await userEvent.click(deleteBtnEl);

    expect(deleteBtnEl).toBeInTheDocument();
    expect(deleteBtnEl).toBeDisabled();
    expect(onDelete).not.toBeCalled();
  });
  it('выполненная задача зачеркнута', async () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();
    render(<Item {...doneItem} onDelete={onDelete} onToggle={onToggle} />);

    const headerEl = screen.getByText('купить хлеб');

    expect(headerEl).toMatchInlineSnapshot(`
    <s>
      купить хлеб
    </s>
    `);
  });
  it('корректно работает смена статуса задачи', async () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();
    render(<Item {...undoneItem} onDelete={onDelete} onToggle={onToggle} />);

    const headerEl = screen.getByTestId('item label');
    const toggleEl = screen.getByRole('checkbox');

    expect(toggleEl).not.toBeChecked();

    await userEvent.click(headerEl);

    expect(toggleEl).toBeChecked();

    await userEvent.click(headerEl);

    expect(toggleEl).not.toBeChecked();

  });
});
