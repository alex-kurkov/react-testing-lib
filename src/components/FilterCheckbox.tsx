type Props = {
  onClick: () => void;
  disabled: boolean;
  filterEnabled: boolean;
};

export const FilterCheckbox = ({ onClick, disabled, filterEnabled }: Props) => {

  return (
    <input
      type='checkbox'
      className="checkbox"
      disabled={disabled}
      onClick={onClick}
      defaultChecked={filterEnabled}
      alt="фильтровать задачу">
    </input>
  );
};
