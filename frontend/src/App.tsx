import HomeAI from './components/HomeAI';
import './App.css';
import TaskList from './components/TaskList';
import { useCollection, useQuery } from '@squidcloud/react';
import { MaintenanceTask } from './components/common/types';
import ExplainModal from './components/ExplainModal';


function App() {
  const taskCollection = useCollection<MaintenanceTask>('tasks');
  const { data } = useQuery(taskCollection.query().dereference());

  const handleToggle = async (id: string, completed: boolean) => {
    await taskCollection.doc(id).update({
      completed,
    });
  };

  const handleDelete = async (id: string) => {
    await taskCollection.doc(id).delete();
  };

  return (
    <div>
      <h1>Household Maintenance</h1>
      <ExplainModal />
      <div className="container">
        <HomeAI />
        <TaskList
          items={data}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      </div>
    </div>
  );
}

export default App;
