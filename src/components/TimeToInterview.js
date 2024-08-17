import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

const TimeToInterview = () => {
  const { applications } = useContext(AppContext);

  const calculateTimeToInterview = () => {
    const interviewingApplications = applications.filter(app =>
      app.status === 'Interviewing' && app.responseDate
    );

    const totalDays = interviewingApplications.reduce((total, app) => {
      const applicationDate = new Date(app.applicationDate);
      const interviewDate = new Date(app.responseDate);
      const timeDifference = interviewDate - applicationDate;
      const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
      return total + daysDifference;
    }, 0);

    return interviewingApplications.length > 0
      ? (totalDays / interviewingApplications.length).toFixed(2)
      : 'N/A';
  };

  const averageTimeToInterview = calculateTimeToInterview();

  return (
    <div className="analytics-card">
      <h2>Average Time to Interview</h2>
      <p>{averageTimeToInterview} days</p>
    </div>
  );
};

export default TimeToInterview;
