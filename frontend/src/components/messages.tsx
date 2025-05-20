import { ChatMessage } from '@squidcloud/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Messages.scss';

interface ChatHistoryProps {
  messages: ChatMessage[];
}

const Messages: React.FC<ChatHistoryProps> = ({ messages }) => {
  return (
    <div className="messages">
      {messages.map(({ id, message, type }) => (
        <div key={id} className={`messages__container ${type}`}>
          {type === 'ai' && (
            <img
              src={'/avatar.svg'}
              alt="AI Icon"
              className="messages__container__ai-icon"
              style={{
                borderRadius: 16
              }}
            />
          )}
          <div key={id} className={`message ${type}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {`${message}`}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
