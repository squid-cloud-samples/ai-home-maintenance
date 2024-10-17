import HomeAI from './components/HomeAI';
import './App.css';
import TaskList from './components/TaskList';
import { useCollection, useQuery, useAiChatbot } from '@squidcloud/react';
import { useState, ChangeEvent } from 'react';
import { MaintenanceTask } from './components/common/types';
import ExplainModal from './components/ExplainModal';

function App() {
  const taskCollection = useCollection<MaintenanceTask>('tasks');
  const { data } = useQuery(taskCollection.query().dereference());
  const [question, setQuestion] = useState('');
  const { history, chat, complete } = useAiChatbot(
    'ai_agents',
    'maintenance-scheduler',
  );

  const handleToggle = async (id: string, completed: boolean) => {
    await taskCollection.doc(id).update({
      completed,
    });
  };

  const handleDelete = async (id: string) => {
    await taskCollection.doc(id).delete();
  };

    const askQuestion = async () => {
      chat(question, { functions: ['checkTasksAI', 'createTaskItem'] });
      setQuestion('');
    }

    const questionChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setQuestion(e.target.value);
    }

    const checkKey = (ele: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (ele.key === 'Enter') {
        askQuestion();
      }
    }

  return (
    <div>
      <div className="background-img">
        <h1>Household Maintenance</h1>
        <ExplainModal />
      </div>
      <div className="container">
        <HomeAI messages={history} questionChanged={questionChanged} question={question} complete={complete} askQuestion={askQuestion} checkKey={checkKey} />
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
