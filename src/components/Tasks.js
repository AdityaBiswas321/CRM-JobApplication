import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';

const Tasks = () => {
  const { tasks, applications, setTasks, deleteTaskFromDatabase } = useContext(AppContext);
  const navigate = useNavigate();

  // Sort tasks by due date, with tasks due today at the top
  const sortedTasks = tasks.slice().sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const getTaskColor = (task) => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);

    // Compare the date strings to eliminate any time-related discrepancies
    const todayDateString = today.toISOString().split('T')[0];
    const dueDateString = dueDate.toISOString().split('T')[0];

    if (todayDateString === dueDateString) {
      return 'red'; // Task due today
    } else {
      return 'green'; // Task not due today
    }
  };

  const handleDelete = async (index, taskId) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    await deleteTaskFromDatabase(taskId); // Delete task from the database
  };

  const goToApplicationDetails = (applicationId) => {
    navigate(`/applications/${applicationId}`);
  };

  // Filter out tasks with the title "follow-up-complete"
  const filteredTasks = sortedTasks.filter(task => task.title !== 'follow-up-complete');

  return (
    <div id="tasks">
      <h1>Task Management</h1>
      <div id="tasks-list">
        {filteredTasks.map((task, index) => {
          const application = applications.find(app => app.id === task.applicationId);
          const taskColor = getTaskColor(task);

          return (
            <div key={index} className="task-card" style={{ borderColor: taskColor }}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              {application && (
                <>
                  <p><strong>Associated Job:</strong></p>
                  <p>Company: {application.companyName}</p>
                  <p>Position: {application.position}</p>
                  <button onClick={() => goToApplicationDetails(application.id)}>View Application</button>
                </>
              )}
              <button onClick={() => handleDelete(index, task.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
