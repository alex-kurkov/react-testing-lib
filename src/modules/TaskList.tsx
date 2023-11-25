import { useDispatch, useSelector } from "react-redux";
import { Empty } from "src/components/Empty";
import { List } from "src/components/List";
import { deleteTask, filterEnabledSelector, tasksSelector, toggleTask } from "src/store/taskSlice";

export const TaskList = () => {
  const items = useSelector(tasksSelector);
  const filtered = useSelector(filterEnabledSelector);

  
  const dispatch = useDispatch();
  
  const handleDelete = (id: Task["id"]) => {
    dispatch(deleteTask(id));
  };
  
  const handleToggle = (id: Task["id"]) => {
    dispatch(toggleTask(id));
  };

  const renderedTasks = filtered ? items.filter(item => item.done === false) : items
  
  return items.length > 0 ? (
    <>
      {filtered}
      <List
        items={renderedTasks}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </>
  ) : (
    <Empty />
  );
};
