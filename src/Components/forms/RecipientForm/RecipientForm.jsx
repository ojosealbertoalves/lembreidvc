import React from 'react';
import './RecipientFormstyle.css';

/**
 * Form component to collect recipient information and message
 * @param {Object} props - Component props
 * @param {Object} props.formData - Contains form fields values
 * @param {Function} props.onInputChange - Handler for input changes
 * @param {Function} props.onSubmit - Handler for form submission
 * @returns {JSX.Element} Form with name, email, phone and message fields
 */
const RecipientForm = ({ formData, onInputChange, onSubmit }) => {
  return (
    <div className="recipient-form">
      <h2>Who will receive the message?</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={onInputChange}
            placeholder="Type your message here..."
            rows="4"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default RecipientForm;