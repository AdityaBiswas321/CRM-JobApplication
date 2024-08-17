import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

const TimeToResponse = () => {
  const { applications } = useContext(AppContext);

  const calculateTimeToResponse = () => {
    const respondedApplications = applications.filter(app =>
      app.responseDate && app.status !== 'Applied'
    );

    const totalDays = respondedApplications.reduce((total, app) => {
      const applicationDate = new Date(app.applicationDate);
      const responseDate = new Date(app.responseDate);
      const timeDifference = responseDate - applicationDate;
      const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
      return total + daysDifference;
    }, 0);

    return respondedApplications.length > 0
      ? (totalDays / respondedApplications.length).toFixed(2)
      : 'N/A';
  };

  const averageTimeToResponse = calculateTimeToResponse();

  return (
    <div className="analytics-card">
      <h2>Average Time to Response</h2>
      <p>{averageTimeToResponse} days</p>
    </div>
  );
};

export default TimeToResponse;
