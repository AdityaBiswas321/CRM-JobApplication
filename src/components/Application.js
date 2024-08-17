import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { v4 as uuidv4 } from 'uuid';

const Applications = ({ onAddTask }) => {
  const { applications, addApplication, updateApplication, deleteApplication } = useContext(AppContext);
  const [formData, setFormData] = useState({
    id: '',
    companyName: '',
    position: '',
    applicationDate: '',
    status: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateApplication(formData);
      setIsEditing(false);
    } else {
      addApplication({ ...formData, id: uuidv4() });
    }
    setFormData({ id: '', companyName: '', position: '', applicationDate: '', status: '' });
  };

  const handleEdit = (application) => {
    setFormData(application);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    deleteApplication(id);
  };

  return (
    <div id="applications">
      <h1>Job Application Management</h1>
      <form id="application-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="applicationDate">Application Date:</label>
          <input
            type="date"
            id="applicationDate"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isEditing ? 'Update Application' : 'Add Application'}</button>
      </form>
      <h2>Applications List</h2>
      <ul id="applications-list">
        {applications.map((application) => (
          <li key={application.id}>
            {application.companyName} - {application.position} - {application.applicationDate} - {application.status}
            <button onClick={() => handleEdit(application)}>Edit</button>
            <button onClick={() => handleDelete(application.id)}>Delete</button>
            <button onClick={() => onAddTask(application)}>Add Task</button>
            <Link to={`/applications/${application.id}`}>
              <button>More Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Applications;
