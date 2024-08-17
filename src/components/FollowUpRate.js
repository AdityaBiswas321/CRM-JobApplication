import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

const FollowUpRate = () => {
  const { applications, tasks } = useContext(AppContext);

  const calculateFollowUpRate = () => {
    const followUpApplications = applications.filter(app =>
      tasks.some(task => task.applicationId === app.id && task.title.toLowerCase().includes('follow-up-complete'))
    );

    return applications.length > 0
      ? ((followUpApplications.length / applications.length) * 100).toFixed(2)
      : 'N/A';
  };

  const followUpRate = calculateFollowUpRate();

  return (
    <div className="analytics-card">
      <h2>Follow-up Rate</h2>
      <p>{followUpRate}%</p>
    </div>
  );
};

export default FollowUpRate;
