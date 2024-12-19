import React from 'react'
import { Footer } from './Footer'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
      <Helmet>
        <title>OneDrug</title>
        <meta property="og:title" content="OneDrug homepage" />
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

        {/* OneDrug ProbeiT */}
        <div className="bg-[#E8EAEA] text-dark-blue p-16 md:pt-28">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 mb-8 lg:mb-0 ">
              <img
                alt="ProbeiT test device"
                src="/external/probitDevice.png"
                className="h-80 md:ml-auto md:mr-44"
              />
            </div>
            <div className="flex-1 lg:pl-8">
              <img
                src="/external/probeit-wordmark-color.svg"
                alt="OneDrug ProbeiT logo"
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
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/db610096-cc1a-4c16-a6a4-d7fe86039a7e?org_if_sml=17907&amp;force_format=original"
              className="w-32 h-auto md:w-40 md:h-auto"
            />
            <img
              alt="University Health Network"
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/8947b1d9-4a27-422b-b9c9-a69a48e3233e?org_if_sml=13690&amp;force_format=original"
              className="w-32 h-auto md:w-40 md:h-auto"
            />
            <img
              alt="Princeton Plainsboro Teaching Hospital"
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/f2ed2315-43c9-45dd-9ba6-652d699892c3?org_if_sml=111680&amp;force_format=original"
              className="w-32 h-auto md:w-40 md:h-auto"
            />
            <img
              alt="Grey Sloan Memorial Hospital"
              src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/64b188d9-a472-4b5a-9158-d52f2ed82634/1c8dc7fb-084c-4576-ac70-b5772815c26a?org_if_sml=15119&amp;force_format=original"
              className="w-32 h-auto md:w-40 md:h-auto"
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
