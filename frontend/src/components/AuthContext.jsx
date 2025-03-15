import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/users/me');
          setUser(response.data);  // Set user data from response
          //console.log('User set in AuthContext:', response.data);  // Log user data
        } catch (error) {
          console.error('Error fetching user:', error);
          setUser(null);  // Set to null if not authenticated or error occurs
        } finally {
          setLoading(false); // Set loading to false after fetch
        }
      };
  
      fetchUser();  // Call fetchUser on mount
    }, []);

    const logout = async () => {
      const response =await axios.get('http://localhost:3000/api/users/logout');
      setUser(null);
      setLoading(false);
      return response;
    };
  
    return (
        <AuthContext.Provider value={{user, setUser, loading, logout}}>
          {/*console.log('User in AuthContext:', user)*/} {/* Debugging line */}
          {children}
        </AuthContext.Provider>
      );
    };