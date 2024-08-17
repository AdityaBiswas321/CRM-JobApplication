import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

const ResponseRate = () => {
  const { applications } = useContext(AppContext);

  const calculateResponseRate = () => {
    const respondedApplications = applications.filter(app => 
      app.status === 'Interviewing' || app.status === 'Offer Received' || app.status === 'Rejected'
    );
    return (respondedApplications.length / applications.length) * 100;
  };

  const responseRate = calculateResponseRate().toFixed(2);

  return (
    <div className="analytics-card">
      <h2>Response Rate</h2>
      <p>{responseRate}%</p>
    </div>
  );
};

export default ResponseRate;
