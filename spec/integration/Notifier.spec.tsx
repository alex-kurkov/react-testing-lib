import { render, screen } from '@testing-library/react';
import ue from '@testing-library/user-event';
import * as taskSliceModule from 'src/store/taskSlice';
import { App } from 'src/App';

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe('Оповещение при вополнении задачи', () => {
  it('появляется и содержит заголовок задачи', async () => {
    const spyNotification = jest.spyOn(taskSliceModule, 'getNotification');

    render(<App />);
    const inputEl = screen.getByRole('textbox');
    const addBtnEl = screen.getByAltText(/Добавить/i);

    await userEvent.clear(inputEl);
    await userEvent.type(inputEl, 'Первая задача');
    await userEvent.click(addBtnEl);

    await userEvent.clear(inputEl);
    await userEvent.type(inputEl, 'Вторая задача');
    await userEvent.click(addBtnEl);

    await userEvent.clear(inputEl);
    await userEvent.type(inputEl, 'Третья задача');
    await userEvent.click(addBtnEl);

    const secondTaskEl = screen.getByText(/Вторая задача/i);
    let notificationEl;

    notificationEl = screen.queryByTestId('blackout');
    expect(notificationEl).toBeNull();

    await userEvent.click(secondTaskEl);

    notificationEl = screen.getByTestId('blackout');
    expect(notificationEl).toBeInTheDocument();
    expect(notificationEl).toHaveTextContent(
      'Задача "Вторая задача" завершена'
    );

    expect(spyNotification).toBeCalled();
  });
  it('одновременно может отображаться только одно', async () => {
    render(<App />);

    let notifierEls;
    notifierEls = screen.queryAllByTestId('blackout');

    const thirdTaskEl = screen.getByText(/третья задача/i);
    expect(notifierEls).toHaveLength(1);
    expect(thirdTaskEl).toBeInTheDocument();

    userEvent.click(thirdTaskEl);

    notifierEls = screen.queryAllByTestId('blackout');
    expect(notifierEls).toHaveLength(1);

    jest.runAllTimers();

    expect(screen.queryByTestId('blackout')).toBeNull();
  });
});
