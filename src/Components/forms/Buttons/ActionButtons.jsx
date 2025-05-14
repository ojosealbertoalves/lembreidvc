import React from 'react';
import Actionstyle from './ActionButtonstyle.css'

const ActionButtons = ({ onReset, onSubmit }) => {
  return (
    <div className="action-buttons">
      <button type="button" onClick={onReset} className="reset-button">
        Reset All
      </button>
      <button type="button" onClick={onSubmit} className="submit-button">
        Create a memory
      </button>
    </div>
  );
};

export default ActionButtons;