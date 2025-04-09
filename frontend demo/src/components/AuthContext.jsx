import React, { createContext, useState, useEffect } from 'react';
import { mockDoctors, mockPatients } from '../mockData';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [demoMode] = useState(true); // Always true for the demo version
  
    useEffect(() => {
      // Simulate loading a user from storage in demo mode
      const storedUser = localStorage.getItem('demoUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }, []);

    // When user changes, update localStorage
    useEffect(() => {
      if (user) {
        localStorage.setItem('demoUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('demoUser');
      }
    }, [user]);

    const login = (username, password) => {
      // In demo mode, just find a matching username from mock data
      const doctorUser = mockDoctors.find(d => d.username === username);
      if (doctorUser) {
        setUser(doctorUser);
        return { success: true, user: doctorUser };
      }
      
      const patientUser = mockPatients.find(p => p.username === username);
      if (patientUser) {
        setUser(patientUser);
        return { success: true, user: patientUser };
      }
      
      return { success: false, message: "Invalid credentials. For demo, try dr.johnson/dr.chen (doctors) or jsmith/edavis/rwilson (patients)" };
    };

    const logout = () => {
      setUser(null);
      return { success: true };
    };
  
    return (
        <AuthContext.Provider value={{
          user, 
          setUser, 
          loading, 
          logout, 
          login, 
          demoMode
        }}>
          {children}
        </AuthContext.Provider>
      );
    };