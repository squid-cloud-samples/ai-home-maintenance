import './TaskCard.scss';
import { MaintenanceTask } from './common/types';
import '@squidcloud/ui/styles/index.css';
import TrashIcon from '@squidcloud/ui/icons/trash.svg';

type PropTypes = {
  maintainItem: MaintenanceTask;
  onDelete: (id: string) => void;
  onToggle: (id: string, done: boolean) => void;
};

const TaskCard = ({
  maintainItem: taskItem,
  onDelete,
  onToggle,
}: PropTypes) => {
  const { __id, task, appliance, lastUpdated, interval, completed } = taskItem;

  return (
    <div className={`sq-card item-card ${completed ? 'completed' : ''}`}>
      <div className="item-card__left">
        <input
          className="check-icon"
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(__id, !completed)}
        />
      </div>
      <div className="item-card__content">
        <h4 className="taskTitle">{appliance}</h4>
        <span className="description">{task}</span>
        <span>
          <i>{interval}</i>
        </span>
        <span>{lastUpdated}</span>
      </div>
      <div className="item-card__buttons">
        <button onClick={() => onDelete(__id)} className="trash-icon">
          <img src={TrashIcon} width={32} className="sq-icon sq-icon--gray" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
