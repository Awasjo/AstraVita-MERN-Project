import React from 'react'
import { Footer } from './Footer'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
      <Helmet>
        <title>AstraVita</title>
        <meta property="og:title" content="AstraVita homepage" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div>
        {/* Hero section */}
        <div className="flex flex-row relative lg:min-h-home-container">
          {/* Dark blue (left side) */}
          <div className="flex-1 bg-dark-blue flex flex-col justify-center items-center p-4">
            <div className="text-white text-center md:text-left xl:w-3/6">
              <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4 font-medium">
                We’re enabling worldwide access to personalized precision
                medicine.
              </h1>
              <Link
                to="/about-us"
                className="inline-block bg-white text-dark-blue px-6 py-3 rounded-md mt-4 font-bold"
              >
                Find out how
              </Link>
            </div>
          </div>

          {/* Light blue (right side) */}
          <div className="flex-1 bg-light-blue hidden md:flex">

          </div>

          {/* Nurse image */}
          <img
              alt="Smiling nurse holding a clipboard"
              src="/external/hero-image-nurse.png"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-5/6 hidden md:block"
            />
        </div>

        {/* Why pharmacogenomics? */}
        <div className="bg-lavender-gray-light text-dark-blue p-16">
          <div className="text-center">
            <h2 className="font-serif text-2xl md:text-4xl font-medium">
              Why pharmacogenomics?
            </h2>
            <p className="font-sans text-base md:text-lg mt-8 text-black">
              What makes us unique makes our medication needs unique.<br/>
              Variations in specific genes can influence drug metabolism and response, resulting in diminished clinical safety and efficacy.
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-serif text-xl md:text-2xl mt-16 font-medium">
              Adverse drug reactions are responsible for...
            </h3>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16 mt-8">
              <div className="ellipse">
                <span className="big-text font-serif font-semibold text-3xl">
                  5%
                  <span className="small-text font-sans font-normal text-sm">
                    of all urgent hospital admissions
                  </span>
                </span>
              </div>
              <div className="ellipse">
                <span className="big-text font-serif font-semibold text-3xl">
                  500,000
                  <span className="small-text font-sans font-normal text-sm">
                    deaths around the world each year
                  </span>
                </span>
              </div>
              <div className="ellipse">
                <span className="big-text font-serif font-semibold text-3xl">
                  $30 billion
                  <span className="small-text font-sans font-normal text-sm">
                    in annual healthcare spending
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AstraVita BioScan */}
        <div className="bg-[#E8EAEA] text-dark-blue p-16 md:pt-28">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 mb-8 lg:mb-0 ">
              <img
                alt="BioScan test device"
                src="/external/bioscan-device.png"
                className="h-80 md:ml-auto md:mr-44"
              />
            </div>
            <div className="flex-1 lg:pl-8">
              <img
                src="/external/bioscan-wordmark.svg"
                alt="AstraVita BioScan logo"
                className="mb-4 h-10 md:h-8"
              />
              <p className="font-sans text-base md:text-lg md:leading-none mb-8 leading-none max-w-96">
                Our point-of-care pharmacogenomic test device helps doctors
                personalize patient treatment plans by identifying adverse drug
                reactions in 20 minutes.
              </p>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <Link
                  to="/products"
                  className="inline-block bg-dark-blue text-light-theme px-6 py-3 rounded-md font-bold"
                >
                  Learn more
                </Link>
                <Link
                  to="/contact"
                  className="inline-block bg-gray-color text-dark-blue px-6 py-3 rounded-md font-bold"
                >
                  Request a demo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Industry partners */}
        <div className="bg-dark-blue text-white p-16">
          <div className="text-center">
            <h2 className="font-serif text-2xl md:text-xl font-medium">
              Trusted by leading institutions worldwide
            </h2>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12">
            <img
              alt="University of Toronto"
              src="/external/uoft-logo.svg"
              className="w-32 h-auto md:w-40 md:h-auto"
            />
            <img
              alt="University Health Network"
              src="external/uhn-logo.svg"
              className="w-32 h-auto md:w-40 md:h-auto"
            />
            <img
              alt="Princeton Plainsboro Teaching Hospital"
              src="/external/princeton-logo.svg"
              className="w-32 h-auto md:w-40 md:h-auto"
            />
            <img
              alt="Grey Sloan Memorial Hospital"
              src="external/greysloan-logo.svg"
              className="w-32 h-auto md:w-40 md:h-auto"
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
