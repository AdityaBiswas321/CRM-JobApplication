import React from 'react';
import TotalApplications from './TotalApplications';
import ApplicationsByStatus from './ApplicationsByStatus';
import ResponseRate from './ResponseRate';
import TimeToResponse from './TimeToResponse';
import TimeToInterview from './TimeToInterview';
import FollowUpRate from './FollowUpRate';
import JobsAppliedOverTime from './JobsAppliedOverTime'; // Import the new component

const Analytics = () => {
  return (
    <div id="analytics">
      <h1>Analytics</h1>
      <TotalApplications />
      <ApplicationsByStatus />
      <JobsAppliedOverTime />
      <ResponseRate />
      <TimeToResponse />
      <TimeToInterview />
      <FollowUpRate />
      {/* Add more analytics components as needed */}
    </div>
  );
};

export default Analytics;
