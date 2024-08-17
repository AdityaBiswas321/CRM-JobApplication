import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import ApplicationsByStatus from './ApplicationsByStatus'; // Assuming you have this component
import JobsAppliedOverTime from './JobsAppliedOverTime'; // Assuming you have this component
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { applications, tasks } = useContext(AppContext);

  // Total Applications
  const totalApplications = applications.length;

  // Upcoming Tasks: Filter tasks due today or within the next three days
  const today = new Date();
  const upcomingTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    const differenceInDays = (dueDate - today) / (1000 * 60 * 60 * 24);
    return differenceInDays >= 0 && differenceInDays <= 3;
  });

  return (
    <div id="dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard-card">
        <h2>Total Applications</h2>
        <p>{totalApplications}</p>
      </div>

      <div className="dashboard-card">
        <h2>Jobs Applied Per Day</h2>
        <JobsAppliedOverTime view="day" />
      </div>

      <div className="dashboard-card">
        <h2>Upcoming Tasks</h2>
        <ul>
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task, index) => (
              <li key={index}>
                <strong>{task.title}</strong> - Due Date: {task.dueDate}
                <Link to={`/applications/${task.applicationId}`}>View Application</Link>
              </li>
            ))
          ) : (
            <p>No upcoming tasks.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
