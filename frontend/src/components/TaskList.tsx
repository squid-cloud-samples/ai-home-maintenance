import TaskCard from './TaskCard';
import './TaskList.scss';
import { MaintenanceTask } from './common/types';
import '@squidcloud/ui/styles/index.css';

type PropTypes = {
  items: Array<MaintenanceTask>;
  onDelete: (id: string) => void;
  onToggle: (id: string, done: boolean) => void;
};

const TaskList = ({ items, onDelete, onToggle }: PropTypes) => {
  return (
    <div className="item-list">
      <div className="item-list__column">
        <h3 className="heading">Open Tasks</h3>
        <div style={{ padding: '0px' }}>
          {items
            .filter((item) => !item.completed)
            .map((item) => (
              <TaskCard
                key={item.__id}
                maintainItem={item}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            ))}
        </div>
        <h3 className="heading">Completed Tasks</h3>
        <div style={{ padding: '0px' }}>
          {items
            .filter((item) => item.completed)
            .map((item) => (
              <TaskCard
                key={item.__id}
                maintainItem={item}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
