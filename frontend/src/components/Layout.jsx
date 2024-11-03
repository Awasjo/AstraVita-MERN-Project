import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import PatientSideNav from './patientSideNav';
import DoctorSideNav from './doctorSideNav';

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
        <div className="layout" key={user?.role}>
            {user.role === 'Patient'? <PatientSideNav /> : <DoctorSideNav />}
            <div className="main-content">
                {children}
            </div>
        </div>
    )
}

export default Layout;