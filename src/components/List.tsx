import { Item } from "./Item";

type Props = {
  items: Task[];
  onDelete: (id: Task["id"]) => void;
  onToggle: (id: Task["id"]) => void;
  isMaxUndone: boolean;
};

export const List = ({ items, onDelete, onToggle, isMaxUndone = true }: Props) => (
  <>
    {isMaxUndone && (
      <strong>Вы достигли максимального количества невыполненных задач</strong>
    )}
    <ul className="task-list tasks">
      {items.map((item) => (
        <Item {...item} key={item.id} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  </>
);
