import { DeleteButton } from "./DeleteButton";

type Props = Task & {
  onDelete: (id: Task["id"]) => void;
  onToggle: (id: Task["id"]) => void;
};

export const Item = (props: Props) => {
  if (props.header.length === 0 || props.header.length > 32) throw new Error('длина заголовка должна быть от 1 до 32 символов');

  return (
    <li className="item-wrapper">
      <input type="checkbox" id={props.id} defaultChecked={props.done} />
      <label
        htmlFor={props.id}
        onClick={() => props.onToggle(props.id)}>
        {props.done ? <s>{props.header}</s> : props.header}
      </label>
      <DeleteButton
        disabled={!props.done}
        onClick={() => props.onDelete(props.id)}
      />
    </li>
  );
};
