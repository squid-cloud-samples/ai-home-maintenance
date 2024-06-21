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
      <button className="sq-btn sq-btn--outline" onClick={openModal}>
        Learn more
      </button>
      <Modal
        className="sq-card sq-modal__content"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>
          This AI agent accesses household appliance manuals to determine
          maintenance schedules. Here are some prompts to try:{' '}
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
        <div>View the appliance manuals:</div>
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
