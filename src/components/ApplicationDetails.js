import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../AppContext';
import TaskModal from './TaskModal'; // Import the TaskModal component

const ApplicationDetails = () => {
  const { applications, tasks, setTasks, addTaskToDatabase, deleteTaskFromDatabase, updateApplication } = useContext(AppContext);
  const { id: applicationId } = useParams();
  const application = applications.find(app => app.id === applicationId);
  const associatedTasks = tasks.filter(task => task.applicationId === applicationId);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [status, setStatus] = useState(application?.status || 'Applied');

  const handleAddTask = () => {
    setCurrentTask(null); // Prepare to add a new task
    setShowTaskModal(true);
  };

  const handleCloseModal = () => {
    setShowTaskModal(false);
    setCurrentTask(null);
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    const responseStatuses = ['Interviewing', 'Offer Received', 'Rejected'];

    const updatedApplication = {
      ...application,
      status: newStatus,
      responseDate: responseStatuses.includes(newStatus) ? new Date().toISOString() : application.responseDate,
    };

    updateApplication(updatedApplication);
    setStatus(newStatus);
  };

  const handleDeleteTask = async (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    await deleteTaskFromDatabase(taskId);
  };

  if (!application) {
    return <p>Application not found</p>;
  }

  return (
    <div id="application-details">
      <h1>{application.companyName} - {application.position}</h1>
      <p>Application Date: {application.applicationDate}</p>
      <p>Status: 
        <select value={status} onChange={handleStatusChange}>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer Received">Offer Received</option>
          <option value="Rejected">Rejected</option>
        </select>
      </p>

      <h2>Tasks for this Application:</h2>
      <ul>
        {associatedTasks.map((task, index) => (
          <li key={index}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <button onClick={() => handleDeleteTask(task.id)}>Delete Task</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddTask}>Add New Task</button>

      {showTaskModal && (
        <TaskModal
          application={application}
          onClose={handleCloseModal}
          task={currentTask}
        />
      )}
    </div>
  );
};

export default ApplicationDetails;
