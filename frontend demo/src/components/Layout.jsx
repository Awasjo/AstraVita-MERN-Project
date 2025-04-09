import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import PatientSideNav from './patientSideNav';
import DoctorSideNav from './DoctorSideNav';

const Layout = ({ children}) => {
    const navigate = useNavigate();
    const { user, loading} = useContext(AuthContext);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);
    
    if (loading) {
        return <p>Loading...</p>; // Render loading state while fetching user
      }
      
    if (!user) {
        return null;
    }

    return (
        <div className="flex">
        <div className="fixed md:relative z-40">
          {user.role === 'Patient' ? <PatientSideNav patient={user} /> : <DoctorSideNav doctor={user}/>}
        </div>
        <div className="flex-1 ml-0 md:ml-[200px] p-4">
          {children}
        </div>
      </div>
    )
}

export default Layout;