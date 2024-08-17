import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

const TotalApplications = () => {
  const { applications } = useContext(AppContext);

  return (
    <div className="analytics-card">
      <h2>Total Applications Submitted</h2>
      <p>{applications.length}</p>
    </div>
  );
};

export default TotalApplications;
