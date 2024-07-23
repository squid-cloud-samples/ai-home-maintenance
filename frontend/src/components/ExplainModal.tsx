import { useState } from 'react';
import Modal from 'react-modal';
import './ExplainModal.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '24px 36px 24px 36px',
  },
};

Modal.setAppElement('#root');

const ExplainModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button className="sq-btn" onClick={openModal}>
        Learn more
      </button>
      <Modal
        className="sq-card sq-modal__content"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '1.5em',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.4142 10.0002L15.7072 5.70725C16.0982 5.31625 16.0982 4.68425 15.7072 4.29325C15.3162 3.90225 14.6842 3.90225 14.2933 4.29325L10.0002 8.58625L5.70725 4.29325C5.31625 3.90225 4.68425 3.90225 4.29325 4.29325C3.90225 4.68425 3.90225 5.31625 4.29325 5.70725L8.58625 10.0002L4.29325 14.2933C3.90225 14.6842 3.90225 15.3162 4.29325 15.7072C4.48825 15.9022 4.74425 16.0002 5.00025 16.0002C5.25625 16.0002 5.51225 15.9022 5.70725 15.7072L10.0002 11.4142L14.2933 15.7072C14.4882 15.9022 14.7443 16.0002 15.0002 16.0002C15.2562 16.0002 15.5122 15.9022 15.7072 15.7072C16.0982 15.3162 16.0982 14.6842 15.7072 14.2933L11.4142 10.0002Z"
              fill="#77797E"
            />
          </svg>
        </button>
        <h3>Here's how it works</h3>
        <div>
          <b>
            This AI agent accesses household appliance manuals to determine
            maintenance schedules. Here are some prompts to try:{' '}
          </b>
        </div>
        <ul>
          <li>How do I clean my cooktop?</li>
          <li>Create a list of maintenance tasks.</li>
          <li>Which maintenance tasks have I completed?</li>
          <li>
            {' '}
            Look up in the manual to determine how often I should clean my
            washer-dryer lint filter. Based on that interval, if I run two loads
            of laundry a day, how often should I clean the filter?
          </li>
        </ul>
        <div>
          <b>View the appliance manuals:</b>
        </div>
        <ul>
          <a
            href="https://media3.bosch-home.com/Documents/9001641455_A.pdf"
            target="_blank"
          >
            Dishwasher
          </a>
          <br />
          <a
            href="https://media3.bosch-home.com/Documents/8001203758_A.pdf"
            target="blank"
          >
            Cooking Range
          </a>
          <br />
          <a
            href="https://products-salsify.geappliances.com/image/upload/s--k3YOGqEX--/gysrxemnpwezevlndzko.pdf"
            target="_blank"
          >
            Washer and Dryer
          </a>
          <br />
          <a
            href="https://media3.bosch-home.com/Documents/9001152447_B.pdf"
            target="_blank"
          >
            Microwave
          </a>
        </ul>

        <div className="create-modal__buttons">
          <button className="sq-btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ExplainModal;
