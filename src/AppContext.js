import React, { createContext, useState, useEffect } from 'react';
import { collection, addDoc, setDoc, doc, getDocs, deleteDoc, writeBatch, query, where } from 'firebase/firestore';
import { db } from './firebase';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const applicationsCollection = collection(db, 'applications');
      const applicationsSnapshot = await getDocs(applicationsCollection);
      const applicationsList = applicationsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setApplications(applicationsList);
    };

    const fetchTasks = async () => {
      const tasksCollection = collection(db, 'tasks');
      const tasksSnapshot = await getDocs(tasksCollection);
      const tasksList = tasksSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setTasks(tasksList);
    };

    fetchApplications();
    fetchTasks();
  }, []);

  const addApplication = async (application) => {
    const docRef = await addDoc(collection(db, 'applications'), application);
    setApplications([...applications, { ...application, id: docRef.id }]);
  };


  const deleteApplication = async (applicationId) => {
    // Create a new batch instance
    const batch = writeBatch(db);
  
    // First, delete all tasks associated with this application
    const tasksQuery = query(collection(db, 'tasks'), where('applicationId', '==', applicationId));
    const tasksSnapshot = await getDocs(tasksQuery);
  
    tasksSnapshot.forEach((taskDoc) => {
      batch.delete(taskDoc.ref);
    });
  
    // Delete the application
    batch.delete(doc(db, 'applications', applicationId));
  
    // Commit the batch operation
    await batch.commit();
  
    // Update local state
    setApplications(applications.filter(application => application.id !== applicationId));
    setTasks(tasks.filter(task => task.applicationId !== applicationId));
  };

  const addTaskToDatabase = async (task) => {
    const docRef = await addDoc(collection(db, 'tasks'), task);
    setTasks([...tasks, { ...task, id: docRef.id }]);
  };

  const deleteTaskFromDatabase = async (taskId) => {
    await deleteDoc(doc(db, 'tasks', taskId));
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const updateApplication = async (updatedApplication) => {
    await setDoc(doc(db, 'applications', updatedApplication.id), updatedApplication);
    setApplications((prevApplications) =>
      prevApplications.map((app) => (app.id === updatedApplication.id ? updatedApplication : app))
    );
  };

  return (
    <AppContext.Provider value={{
      applications,
      setApplications,
      tasks,
      setTasks,
      addApplication,
      deleteApplication,  // Added deleteApplication here
      addTaskToDatabase,
      deleteTaskFromDatabase,
      updateApplication,
    }}>
      {children}
    </AppContext.Provider>
  );
};
