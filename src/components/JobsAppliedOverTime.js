import React, { useContext, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { AppContext } from '../AppContext';
import { format, parseISO, startOfWeek, startOfMonth } from 'date-fns';

const JobsAppliedOverTime = () => {
  const { applications } = useContext(AppContext);
  const [view, setView] = useState('day'); // Default to daily view

  const groupApplicationsByTime = () => {
    const grouped = {};

    applications.forEach(app => {
      const applicationDate = parseISO(app.applicationDate);
      let key;

      if (view === 'day') {
        key = format(applicationDate, 'yyyy-MM-dd');
      } else if (view === 'week') {
        key = format(startOfWeek(applicationDate), 'yyyy-MM-dd');
      } else if (view === 'month') {
        key = format(startOfMonth(applicationDate), 'yyyy-MM');
      }

      if (!grouped[key]) {
        grouped[key] = 0;
      }

      grouped[key] += 1;
    });

    return Object.keys(grouped).map(key => ({
      date: key,
      count: grouped[key]
    }));
  };

  const data = groupApplicationsByTime();

  return (
    <div className="analytics-card">
      <h2>Jobs Applied Per {view.charAt(0).toUpperCase() + view.slice(1)}</h2>

      <div>
        <label>
          <input
            type="radio"
            name="view"
            value="day"
            checked={view === 'day'}
            onChange={() => setView('day')}
          />
          Day
        </label>
        <label>
          <input
            type="radio"
            name="view"
            value="week"
            checked={view === 'week'}
            onChange={() => setView('week')}
          />
          Week
        </label>
        <label>
          <input
            type="radio"
            name="view"
            value="month"
            checked={view === 'month'}
            onChange={() => setView('month')}
          />
          Month
        </label>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#007bff" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default JobsAppliedOverTime;
