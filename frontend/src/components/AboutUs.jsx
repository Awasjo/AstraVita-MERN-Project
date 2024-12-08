import React from 'react'
import { Footer } from './Footer'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <div>
      <Helmet>
        <title>About OneDrug</title>
        <meta property="og:title" content="OneDrug About Us page" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div>
        <div className="flex flex-wrap">
          {/* Top left */}
          <div className="w-1/2">
            <img
              alt="Doctor showing a clipboard to a patient"
              src="/external/hero-image-doctor-with-patient.png"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top right */}
          <div className="w-1/2 bg-navy-blue-dark flex justify-center items-center">
            <div className="text-white w-1/2">
              <h1 className="font-serif text-4xl md:text-5xl leading-tight">
                Our Vision
              </h1>
              <p className="font-sans text-base md:text-lg mt-4">
                OneDrug’s vision is to lead the global transformation of healthcare by making personalized precision medicine accessible and impactful across every corner of the world.
              </p>
            </div>
          </div>

          {/* Bottom left */}
          <div className="w-1/2 bg-navy-blue-dark flex justify-center items-center">
            <div className="text-white w-1/2">
              <h1 className="font-serif text-4xl md:text-5xl leading-tight">
                Our Mission
              </h1>
              <p className="font-sans text-base md:text-lg mt-4">
                OneDrug’s mission is to pioneer innovative smart technology solutions that revolutionize healthcare by enabling personalized treatments.
              </p>
            </div>
          </div>

          {/* Bottom right */}
          <div className="w-1/2">
            <img
              alt="Female researcher next to a microscope"
              src="/external/hero-image-researchers.png"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default AboutUs