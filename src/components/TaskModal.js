import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';

const TaskModal = ({ onClose, application, task }) => {
  const { tasks, setTasks, addTaskToDatabase } = useContext(AppContext);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    applicationId: application ? application.id : null,
    completed: false,
  });

  useEffect(() => {
    if (task) {
      setTaskData(task);
    }
  }, [task]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleFollowUpChange = () => {
    setTaskData({
      ...taskData,
      title: 'follow-up-complete',
      description: 'This task is to mark the follow-up as complete.',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTasks = task ? tasks.map(t => t.id === task.id ? taskData : t) : [...tasks, taskData];
    setTasks(updatedTasks);
    addTaskToDatabase(taskData);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Add Task for {application ? application.companyName : 'No Application Selected'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
            disabled={taskData.title === 'follow-up-complete'}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
            disabled={taskData.title === 'follow-up-complete'}
          ></textarea>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="radio"
            id="follow-up-complete"
            name="taskType"
            onChange={handleFollowUpChange}
            checked={taskData.title === 'follow-up-complete'}
          />
          <label htmlFor="follow-up-complete">Mark as Follow-up Complete</label>
        </div>
        <button type="submit">Save Task</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default TaskModal;
