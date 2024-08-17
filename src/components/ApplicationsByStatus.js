import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { AppContext } from '../AppContext';

const ApplicationsByStatus = () => {
  const { applications } = useContext(AppContext);

  // Define the possible statuses and their colors
  const statusColors = {
    Applied: '#007bff',
    Interviewing: '#28a745',
    'Offer Received': '#ffc107',
    Rejected: '#dc3545'
  };

  // Initialize the statusCounts with zero for each status
  const statusCounts = {
    Applied: 0,
    Interviewing: 0,
    'Offer Received': 0,
    Rejected: 0
  };

  // Count the number of applications in each status
  applications.forEach(app => {
    statusCounts[app.status] += 1;
  });

  // Convert the statusCounts object into an array of objects for Recharts
  const data = Object.keys(statusCounts).map(status => ({
    status,
    count: statusCounts[status],
    fill: statusColors[status] // Assign the color based on the status
  }));

  return (
    <div>
      <h2>Applications by Status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApplicationsByStatus;
