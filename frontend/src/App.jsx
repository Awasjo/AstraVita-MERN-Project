import React from 'react'

import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import Login from './components/Login';
import Register from './components/Register';
import DoctorPortal from './components/DoctorPortal';
import PatientPortal from './components/PatientPortal';
import Layout from './components/Layout';

import './App.css'

const Home = () => {
  return (
    <div className="home-container">
      <Helmet>
        <title>OneDrug homepage</title>
        <meta property="og:title" content="OneDrug homepage" />
      </Helmet>
      <div className="home-desktop-home">
        <div className="home-footer">
          <span className="home-text10">
            <span>© 2024 OneDrug Inc. All rights reserved.</span>
          </span>
          <div className="home-social-media">
            <img
              alt="iconmonstrtwitter316511"
              src="/external/iconmonstrtwitter316511-hifv.svg"
              className="home-iconmonstrtwitter31"
            />
            <img
              alt="iconmonstrlinkedin316511"
              src="/external/iconmonstrlinkedin316511-0rq8.svg"
              className="home-iconmonstrlinkedin31"
            />
            <img
              alt="iconmonstrinstagram1316511"
              src="/external/iconmonstrinstagram1316511-30hf.svg"
              className="home-iconmonstrinstagram131"
            />
            <img
              alt="iconmonstrfacebook316511"
              src="/external/iconmonstrfacebook316511-6s1s.svg"
              className="home-iconmonstrfacebook31"
            />
          </div>
        </div>
        <div className="home-frame4">
          <div className="home-partners">
            <span className="home-text12">
              <span>Trusted by leading institutions worldwide</span>
            </span>
            <img
              alt="GreySloan1063"
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/1c8dc7fb-084c-4576-ac70-b5772815c26a?org_if_sml=15119&amp;force_format=original"
              className="home-grey-sloan"
            />
            <img
              alt="PrincetonPlainsboro1062"
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/f2ed2315-43c9-45dd-9ba6-652d699892c3?org_if_sml=111680&amp;force_format=original"
              className="home-princeton-plainsboro"
            />
            <img
              alt="UHN1062"
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/8947b1d9-4a27-422b-b9c9-a69a48e3233e?org_if_sml=13690&amp;force_format=original"
              className="home-uhn"
            />
            <img
              alt="UofT1062"
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/db610096-cc1a-4c16-a6a4-d7fe86039a7e?org_if_sml=17907&amp;force_format=original"
              className="home-uof-t"
            />
          </div>
        </div>
        <div className="home-frame3">
          <div className="home-text14">
            <div className="home-requestdemo-button">
              <span className="home-text15">
                <span>Request a demo</span>
              </span>
            </div>
            <div className="home-learnmore-button">
              <span className="home-text17">
                <span>Learn more</span>
              </span>
            </div>
            <span className="home-text19">
              <span>
                Our point-of-care pharmacogenomic test device helps doctors
                personalize patient treatment plans by identifying adverse drug
                reactions in 20 minutes.
              </span>
            </span>
            <span className="home-text21">ProbeiT</span>
              <span className="home-text22">OneDrug</span>
              
          </div>
          <div className="home-placeholder-image">
            <img
              alt="Rectangle3516"
              src="/external/probitDevice.JPG"
              className="home-rectangle"
            />
          </div>
        </div>
        <div className="home-frame2">
          <div className="home-adr-statistics">
            <div className="home-statistic3">
              <img
                alt="Ellipse4649"
                src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/de310ab7-c9c2-4c37-9a6e-29f1833810f3?org_if_sml=13135&amp;force_format=original"
                className="home-ellipse1"
              />
              <span className="home-text24">
                <span>in annual healthcare spending</span>
              </span>
              <span className="home-text26">
                <span>$30 billion</span>
              </span>
            </div>
            <div className="home-statistic2">
              <img
                alt="Ellipse4647"
                src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/41aec902-eb67-463a-bb0e-26832b6faf7b?org_if_sml=13135&amp;force_format=original"
                className="home-ellipse2"
              />
              <span className="home-text28">
                <span>deaths around the world each year</span>
              </span>
              <span className="home-text30">
                <span>500,000</span>
              </span>
            </div>
            <div className="home-statistic1">
              <img
                alt="Ellipse4646"
                src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/4bbbeb75-c307-47ff-b8c4-d4b58e99bd28?org_if_sml=13135&amp;force_format=original"
                className="home-ellipse3"
              />
              <span className="home-text32">
                <span>of all urgent hospital admissions</span>
              </span>
              <span className="home-text34">
                <span>5%</span>
              </span>
            </div>
            <span className="home-text36">
              <span>Adverse drug reactions are responsible for...</span>
            </span>
          </div>
          <div className="home-intro">
            <span className="home-text38">
              <span>
                What makes us unique also makes our medication needs unique.
                Variations in specific genes can influence drug metabolism and
                response, resulting in diminished clinical safety and efficacy.
              </span>
            </span>
            <span className="home-text40">
              <span>Why pharmacogenomics?</span>
            </span>
          </div>
        </div>
        <div className="home-frame1">
          <div className="home-hero-image">
            <img
              alt="Gray2512"
              src="/external/gray2512-91s-800w.png"
              className="home-gray"
            />
            <img
              alt="Blue2513"
              src="/external/blue2513-8gd-800w.png"
              className="home-blue"
            />
            <img
              alt="Nurse2510"
              src="/external/nurse2510-5u3o-400w.png"
              className="home-nurse"
            />
          </div>
          <div className="home-findout-button">
            <span className="home-text42">
              <span>Find out how</span>
            </span>
          </div>
          <span className="home-text44">
            <span>
              We’re enabling worldwide access to personalized precision
              medicine.
            </span>
          </span>
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
        <Route path="/doctor" 
        element={
          <Layout>
        <DoctorPortal />
        </Layout>
        } /> {/* Doctor portal route */}
        <Route path="/patient" 
        element={
          <Layout>
        <PatientPortal />
        </Layout>
        } /> {/* Patient portal route */}
      </Routes>
    </Router>
  );
};

export default App;

