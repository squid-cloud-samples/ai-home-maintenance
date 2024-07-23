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
        <div key={id} className={`message-container ${type}`}>
          {type === 'ai' && (
            <img
              src={'../../public/Avatar.png'}
              alt="AI Icon"
              className="ai-icon"
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
