import React, { useState, useEffect } from 'react';
import './form.css';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [phoneType, setPhoneType] = useState('');
  const [staff, setStaff] = useState('');
  const [bio, setBio] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    const errors = [];

    if (name.length === 0) errors.push('Please enter your Name');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) errors.push('Please provide a valid Email');

    const phonePattern = /^[0-9]{8}$/;
    if (number && !phonePattern.test(number)) errors.push('Phone number must be 10 digits');

    if (number && !phoneType) errors.push('Please select a phone type if phone number is provided');

    if (bio.length > 280) errors.push('Bio cannot exceed 280 characters');

    if (!staff) errors.push('Staff role must be selected');

    setValidationErrors(errors);
  }, [name, email, number, phoneType, bio, staff]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validationErrors.length > 0) return;

    const formData = {
      name,
      email,
      number,
      phoneType,
      staff,
      bio,
      notifications,
      submittedOn: new Date().toISOString(),
    };

    console.log(formData);

    setName('');
    setEmail('');
    setNumber('');
    setPhoneType('');
    setStaff('');
    setBio('');
    setNotifications(false);
  };

  return (
    <div className="form-container">
      <h2>Submit Your Details</h2>

      {validationErrors.length > 0 && (
        <ul style={{ color: 'red' }}>
          {validationErrors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            className="form-input"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="number">Phone Number:</label>
          <input
            id="number"
            type="text"
            className="form-input"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
            placeholder="1234567890"
          />
          <select
            name="phoneType"
            className="form-select"
            onChange={(e) => setPhoneType(e.target.value)}
            value={phoneType}
            disabled={!number}
          >
            <option value="" disabled>Select a phone type...</option>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>

        <div className="form-group">
          <label>Staff Role:</label>
          <div className="form-radio">
            <input
              type="radio"
              name="staff"
              value="Instructor"
              checked={staff === 'Instructor'}
              onChange={(e) => setStaff(e.target.value)}
            /> Instructor
          </div>
          <div className="form-radio">
            <input
              type="radio"
              name="staff"
              value="Student"
              checked={staff === 'Student'}
              onChange={(e) => setStaff(e.target.value)}
            /> Student
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            className="form-textarea"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Tell us about yourself (max 280 characters)"
            maxLength="280"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notifications">Sign up for email notifications:</label>
          <input
            type="checkbox"
            id="notifications"
            className="form-checkbox"
            onChange={(e) => setNotifications(e.target.checked)}
            checked={notifications}
          />
        </div>

        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
};

export default Form;
