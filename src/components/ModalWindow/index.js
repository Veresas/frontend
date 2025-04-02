import React from 'react';
import Modal from 'react-modal';
import './ModalWindow.css';
Modal.setAppElement('#root'); 

export const ModalWindow = ({ isOpen, onClose, children }) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
      contentLabel="Modal Window" // Важный атрибут для доступности
    >
      <div className="modal-header">
        <button onClick={onClose}>×</button>
      </div>
      <div className="modal-content">
        {children}
      </div>
    </Modal>
  );
};