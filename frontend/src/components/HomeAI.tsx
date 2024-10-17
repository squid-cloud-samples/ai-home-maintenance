import { LinearProgress } from '@mui/material';
import Messages from './messages';
import '@squidcloud/ui/styles/index.css';
import './HomeAI.scss';
import { ChatMessage } from '@squidcloud/react';
import { ChangeEvent } from 'react';

type PropTypes = {
  messages: ChatMessage[];
  questionChanged: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  question: string;
  complete: boolean;
  checkKey: (ele: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  askQuestion: () => void;
};

const HomeAI: React.FC<PropTypes> = ({messages, questionChanged, question, complete, checkKey, askQuestion}) => {


  return (
    <div className="chat">
      <div className="chat__heading">Chatbot</div>
      <div className="chat__scrolling">
        <Messages messages={messages} />
      </div>
      <div className="chat__question">
        <div className="chat__question__input-frame">
          <textarea
            className="chat__question__input-frame__input-question"
            onChange={questionChanged}
            onKeyDown={(event) => checkKey(event)}
            value={question}
          />
          <button
            className="chat__question__input-frame__flex-btn"
            disabled={!complete}
            onClick={askQuestion}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.9108 2.19368C16.9108 2.19368 16.584 2.11009 16.2602 2.20314L16.2577 2.20386L1.70234 6.30344C1.70234 6.30344 1.32139 6.40759 1.06943 6.71171C1.06943 6.71171 0.817475 7.01583 0.785981 7.4095C0.785981 7.4095 0.754487 7.80317 0.954892 8.14348C0.954892 8.14348 1.1553 8.48379 1.50612 8.64314L8.19308 11.8069L11.3529 18.4852C11.3529 18.4852 11.5163 18.8447 11.8566 19.0452C11.8566 19.0452 12.1969 19.2456 12.5905 19.2141C12.5905 19.2141 12.9842 19.1826 13.2883 18.9306C13.2883 18.9306 13.5925 18.6786 13.6953 18.3023L17.7952 3.74582C17.7952 3.74582 17.8907 3.41908 17.8064 3.08928C17.8064 3.08928 17.722 2.75948 17.4813 2.51876C17.4813 2.51876 17.2406 2.27804 16.9108 2.19368ZM2.032 7.50918L16.5916 3.40845L12.4921 17.9634L12.4909 17.968L9.32275 11.2718C9.32275 11.2718 9.13458 10.8655 8.72357 10.6751L2.04072 7.51323L2.032 7.50918Z"
                fill="#666666"
              />
              <path
                d="M12.637 8.24695C12.7542 8.12974 12.8203 7.97054 12.8203 7.80478C12.8203 7.63902 12.7544 7.48005 12.6372 7.36284L12.6318 7.35751C12.5151 7.24378 12.3583 7.17978 12.1953 7.17978C12.1765 7.17978 12.1578 7.18062 12.1391 7.18231C11.9934 7.19546 11.8568 7.25935 11.7534 7.36284L8.22234 10.8939C8.10513 11.0111 8.03905 11.1703 8.03905 11.336C8.03905 11.346 8.03929 11.3561 8.03977 11.3661C8.04723 11.5212 8.11224 11.6681 8.22211 11.778C8.33932 11.8952 8.49829 11.961 8.66405 11.961C8.82981 11.961 8.98878 11.8952 9.10599 11.778L12.637 8.24695Z"
                fill="#666666"
              />
            </svg>{' '}
          </button>
        </div>
      </div>
      {!complete && <LinearProgress />}
    </div>
  );
}

export default HomeAI;
