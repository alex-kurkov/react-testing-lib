import { render, screen, within } from '@testing-library/react';
import { App } from 'src/App';
import ue from '@testing-library/user-event';

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe('список задач', () => {
  // не содержит выполненные задачи
  // после нажатия на кнопку фильтрации
  afterEach(() => {
    jest.runAllTimers();
  })
  it('с включенным фильтром', async () => {
    render(<App />);

    let items;
    const inputEl = screen.getByRole('textbox');
    const filterCheckboxEl = screen.getByAltText('фильтровать задачу');
    const addBtnEl = screen.getByAltText(/Добавить/i);
  
    await userEvent.clear(inputEl);
    await userEvent.type(inputEl, 'Первая задача');
    await userEvent.click(addBtnEl);
  
    await userEvent.type(inputEl, 'Вторая задача');
    await userEvent.click(addBtnEl);
  
    items = screen.getAllByRole('listitem');
  
    expect(filterCheckboxEl).not.toBeChecked();
    expect(items).toHaveLength(2);
  
    const firstTaskEl = screen.getByText('Первая задача');
    await userEvent.click(firstTaskEl);
  
    await userEvent.click(filterCheckboxEl);
  
    items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(1);
    expect(firstTaskEl).not.toBeInTheDocument();
  });
  
  // показывает как выполненные, так и не выполненные задачи
  // после повторного нажатия на кнопку фильтрации
  it('с выключенным фильтром', async () => {
    render(<App />);
    
    let items;
    const filterCheckboxEl = screen.getByAltText('фильтровать задачу');

    expect(filterCheckboxEl).toBeChecked();
    items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(1);
    
    await userEvent.click(filterCheckboxEl);
    
    items = screen.getAllByRole('listitem');
    const firstTaskElCheckbox = within(items[0]).getByRole('checkbox');
    const secondTaskElCheckbox = within(items[1]).getByRole('checkbox');
    
    expect(filterCheckboxEl).not.toBeChecked();
    expect(items).toHaveLength(2);
    expect(firstTaskElCheckbox).toBeChecked();
    expect(secondTaskElCheckbox).not.toBeChecked();

  });
  
  it('кнопка фильтрации корректно принимает состояние активна/неактивна при пустом списке задач и при всех выполненных задачах, но отключенном фильтре', async () => {
    render(<App />);
    const filterCheckboxEl = screen.getByAltText('фильтровать задачу');
        
    expect(filterCheckboxEl.hasAttribute('disabled')).toBe(false);
    expect(filterCheckboxEl).not.toBeDisabled()
  
    const tasks = screen.getAllByRole('listitem');
    const firstTaskElDeleteBtn = within(tasks[0]).getByRole('button');
    const secondTaskEl = screen.getByText(/вторая задача/i);
    const secondTaskElDeleteBtn = within(tasks[1]).getByRole('button');

    await userEvent.click(secondTaskEl);
    jest.runAllTimers();

    await userEvent.click(firstTaskElDeleteBtn);
    await userEvent.click(secondTaskElDeleteBtn);

    expect(filterCheckboxEl).toBeDisabled();

  });

})
