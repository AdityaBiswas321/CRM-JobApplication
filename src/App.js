import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Applications from './components/Application';
import Tasks from './components/Tasks';
import Analytics from './components/Analytics';
import TaskModal from './components/TaskModal';
import ApplicationDetails from './components/ApplicationDetails';
import { AppProvider } from './AppContext';

function App() {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);

  const handleAddTask = (application) => {
    setCurrentApplication(application);
    setShowTaskModal(true);
  };

  const handleCloseModal = () => {
    setShowTaskModal(false);
    setCurrentApplication(null);
  };

  return (
    <AppProvider>
      <Router>
        <div id="app">
          <nav>
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/applications">Applications</Link></li>
              <li><Link to="/tasks">Tasks</Link></li>
              <li><Link to="/analytics">Analytics</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/applications" element={<Applications onAddTask={handleAddTask} />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/applications/:id" element={<ApplicationDetails />} />
          </Routes>
        </div>
        {showTaskModal && <TaskModal application={currentApplication} onClose={handleCloseModal} />}
      </Router>
    </AppProvider>
  );
}

export default App;
