import React from 'react'
import { Footer } from './Footer'
import { Helmet } from 'react-helmet'

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
          {/* Image (top left) */}
          <div className="w-full md:w-1/2 order-0">
            <img
              alt="Doctor showing a clipboard to a patient"
              src="/external/hero-image-doctor-with-patient.png"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Our Vision (top right) */}
          <div className="w-full md:w-1/2 bg-navy-blue-dark flex justify-center items-center p-8 order-1">
            <div className="text-white w-3/4 md:w-1/2 text-center md:text-left">
              <h1 className="font-serif text-4xl md:text-5xl font-medium">
                Our Vision
              </h1>
              <p className="font-sans text-base md:text-lg mt-4">
                OneDrug’s vision is to lead the global transformation of healthcare by making personalized precision medicine accessible and impactful across every corner of the world.
              </p>
            </div>
          </div>

          {/* Our Mission (bottom left) */}
          <div className="w-full md:w-1/2 bg-dark-blue flex justify-center items-center p-8 order-3 md:order-2">
            <div className="text-white w-3/4 md:w-1/2 text-center md:text-left">
              <h1 className="font-serif text-4xl md:text-5xl font-medium">
                Our Mission
              </h1>
              <p className="font-sans text-base md:text-lg mt-4">
                OneDrug’s mission is to pioneer innovative smart technology solutions that revolutionize healthcare by enabling personalized treatments.
              </p>
            </div>
          </div>

          {/* Image (bottom right) */}
          <div className="w-full md:w-1/2 order-2 md:order-3">
            <img
              alt="Female researcher next to a microscope"
              src="/external/hero-image-researchers.png"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-lavender-gray-light text-dark-blue p-16">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-medium">
              Our Values
            </h1>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16 mt-8">
              <div className="ellipse">
                <span className="big-text font-sans font-semibold text-2xl">
                  Integrity
                  <span className="small-text font-sans font-normal text-sm">
                    Do what's right
                  </span>
                </span>
              </div>
              <div className="ellipse">
                <span className="big-text font-sans font-semibold text-2xl">
                  Productivity
                  <span className="small-text font-sans font-normal text-sm">
                    Optimize output together
                  </span>
                </span>
              </div>
              <div className="ellipse">
                <span className="big-text font-sans font-semibold text-2xl">
                  Accountability
                  <span className="small-text font-sans font-normal text-sm">
                    Own your actions
                  </span>
                </span>
              </div>
              <div className="ellipse">
                <span className="big-text font-sans font-semibold text-2xl">
                  Leadership
                  <span className="small-text font-sans font-normal text-sm">
                    Inspire and guide
                  </span>
                </span>
              </div>
              <div className="ellipse">
                <span className="big-text font-sans font-semibold text-2xl">
                  Teamwork
                  <span className="small-text font-sans font-normal text-sm">
                    Collaborate and achieve
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default AboutUs
