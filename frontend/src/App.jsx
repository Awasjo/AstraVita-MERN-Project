import React from 'react'

import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import Login from './components/Login';
import Register from './components/Register';
import DoctorPortal from './components/DoctorPortal';
import PatientPortal from './components/PatientPortal';
import Layout from './components/Layout';
import AddDoctor from './components/AddDoctor';
import PatientNotifications from './components/PatientNotifications';
import Contact from './components/Contact';
import DoctorNotifications from './components/DoctorNotifications';


const Home = () => {
  return (
    <div>
      <Helmet>
        <title>OneDrug homepage</title>
        <meta property="og:title" content="OneDrug homepage" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Helmet>
      <div>
        
        <div>
          <div>
          <img
              alt="Blue2513"
              src="/external/blue2513-8gd-800w.png"
            />
            <img
              alt="Gray2512"
              src="/external/gray2512-91s-800w.png"
            />
            
            <img
              alt="Nurse2510"
              src="/external/nurse2510-5u3o-400w.png"
            />
          </div>
          <div>
            <span>
              <span>Find out how</span>
            </span>
          </div>
          <span>
            <span>
              We’re enabling worldwide access to personalized precision
              medicine.
            </span>
          </span>
        </div>

        <div>
        <div>            
            <span>
              <span>Why pharmacogenomics?</span>
            </span>
            <span>
              <span>
                What makes us unique <br/> 
                makes our medication needs unique.
                Variations in specific genes <br/>
                can influence drug metabolism and response,<br/>  
                resulting in diminished clinical safety 
                <br/>and efficacy.
              </span>
            </span>
          </div>
          <div>
          <span>
              <span>Adverse drug reactions are responsible for...</span>
            </span>
            <div>
              <img
                alt="Ellipse4649"
                src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/de310ab7-c9c2-4c37-9a6e-29f1833810f3?org_if_sml=13135&amp;force_format=original"
              />
              <span>
                <span>$30 billion</span>
              </span>
              <span>
                <span>in annual healthcare spending</span>
              </span>
              
            </div>
            <div>
              <img
                alt="Ellipse4647"
                src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/41aec902-eb67-463a-bb0e-26832b6faf7b?org_if_sml=13135&amp;force_format=original"
              />
              <span>
                <span>deaths around the world each year</span>
              </span>
              <span>
                <span>500,000</span>
              </span>
            </div>
            <div>
              <img
                alt="Ellipse4646"
                src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/4bbbeb75-c307-47ff-b8c4-d4b58e99bd28?org_if_sml=13135&amp;force_format=original"
              />
              <span>
                <span>of all urgent hospital admissions</span>
              </span>
              <span>
                <span>5%</span>
              </span>
            </div>
            
          </div>
          
        </div>
        
        <div>
          <div>
            <div>
              <span>
                <span>Request a demo</span>
              </span>
            </div>
            <div>
              <span>
                <span>Learn more</span>
              </span>
            </div>
            <span>
              <span>
                Our point-of-care pharmacogenomic test device helps doctors
                personalize patient treatment plans by identifying adverse drug
                reactions in 20 minutes.
              </span>
            </span>
            <span>OneDrug</span>
            <span>ProbeiT</span>
              
              
          </div>
          <div>
            <img
              alt="Rectangle3516"
              src="/external/probitDevice.png"
            />
          </div>
        </div>

        <div>
          <div>
            <span>
              <span>Trusted by leading institutions worldwide</span>
            </span>
            <img
              alt="GreySloan1063"
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/1c8dc7fb-084c-4576-ac70-b5772815c26a?org_if_sml=15119&amp;force_format=original"
            />
            <img
              alt="PrincetonPlainsboro1062"
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/f2ed2315-43c9-45dd-9ba6-652d699892c3?org_if_sml=111680&amp;force_format=original"
            />
            <img
              alt="UHN1062"
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/8947b1d9-4a27-422b-b9c9-a69a48e3233e?org_if_sml=13690&amp;force_format=original"
            />
            <img
              alt="UofT1062"
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/db610096-cc1a-4c16-a6a4-d7fe86039a7e?org_if_sml=17907&amp;force_format=original"
            />
          </div>
        </div>

        <div>
          <span>
            <span>© 2024 OneDrug Inc. All rights reserved.</span>
          </span>
          <div>
            <img
              alt="iconmonstrtwitter316511"
              src="/external/iconmonstrtwitter316511-hifv.svg"
            />
            <img
              alt="iconmonstrlinkedin316511"
              src="/external/iconmonstrlinkedin316511-0rq8.svg"
            />
            <img
              alt="iconmonstrinstagram1316511"
              src="/external/iconmonstrinstagram1316511-30hf.svg"
            />
            <img
              alt="iconmonstrfacebook316511"
              src="/external/iconmonstrfacebook316511-6s1s.svg"
            />
          </div>
        </div>

      </div>
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Reusable Navbar */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/login" element={<Login />} /> {/* Login route */}
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctor" 
          element={
            <Layout>
              <DoctorPortal />
            </Layout>
          } 
        /> {/* Doctor portal route */}
        <Route path="/doctor/notifications" 
          element={
            <Layout>
              <DoctorNotifications />
            </Layout>
          } 
        /> {/* Doctor notifications route */}
        <Route path="/patient/*" 
          element={
            <Layout>
              <PatientPortal />
            </Layout>
          } 
        /> {/* Patient portal route */}
        <Route path="/patient/notifications" 
          element={
            <Layout>
              <PatientNotifications />
            </Layout>
          } 
        /> {/* Patient notifications route */}
        <Route path="/add-doctor" element={<AddDoctor />} /> 
      </Routes>
    </Router>
  );
};

export default App;
