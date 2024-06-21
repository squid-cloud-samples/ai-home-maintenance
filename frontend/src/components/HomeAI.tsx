import { ChangeEvent, useState } from 'react';
import { TextField, LinearProgress } from '@mui/material';
import Messages from './messages';
import { useAiChatbot } from '@squidcloud/react';
import '@squidcloud/ui/styles/index.css';
import './HomeAI.scss';


function HomeAI() {
  const [question, setQuestion] = useState('');
  const { history, chat, complete } = useAiChatbot(
    'maintenance',
    'maintenance-scheduler',
  );

  function askQuestion() {
    chat(question, { functions: ['checkTasksAI', 'createTaskItem'] });
    setQuestion('');
  }

  function questionChanged(e: ChangeEvent) {
    setQuestion((e.target as HTMLInputElement).value);
  }

  function checkKey(ele: React.KeyboardEvent<HTMLDivElement>) {
    if (ele.key === 'Enter') {
      askQuestion();
    }
  }

  return (
    <div className="chatbot">
      <div className="scrolling">
        <Messages messages={history} />
      </div>
      {!complete && <LinearProgress />}
      <div className="question">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Enter your question"
          variant="outlined"
          onChange={questionChanged}
          onKeyDown={(event) => checkKey(event)}
          value={question}
        />
        <button
          className="sq-btn"
          style={{ marginLeft: '20px', height: '50px' }}
          disabled={!complete}
          onClick={askQuestion}
        >
          Ask question
        </button>
      </div>
    </div>
  );
}

export default HomeAI;
