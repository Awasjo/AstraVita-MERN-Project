import React from 'react'
import { Footer } from './Footer'
import { Helmet } from 'react-helmet'

const Products = () => {
  return (
    <div>
      <Helmet>
        <title>AstraVita Products</title>
        <meta property="og:title" content="AstraVita Products page" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div>
        <div className="flex flex-wrap">
          {/* Image (top left) */}
          <div className="w-full md:w-1/2 order-0">
            <img
              alt="AstraVita BioScan test device"
              src="/external/bioscan-device-render.png"
              className="w-full h-full object-cover"
            />
          </div>

          {/* AstraVita BioScan (top right) */}
          <div className="w-full md:w-1/2 bg-dark-blue flex justify-center items-center p-8 order-1">
            <div className="text-white w-3/4 md:w-1/2">
              <img
                src="/external/bioscan-wordmark-white.png"
                alt="AstraVita BioScan logo"
                className="h-12"
              />
              <div className="font-sans text-base md:text-lg mt-4">
                <p>
                  Introducing our breakthrough device that enables doctors to make informed treatment decisions by analysing patients' genetic profiles for clinically relevant drug processing proteins in real-time.
                </p>
                <ul className="list-disc mt-4">
                  <li>Point-of-care</li>
                  <li>Operation expertise not required</li>
                  <li>Results available in 20 minutes</li>
                  <li>Results stored in the cloud</li>
                  <li>Laptop/smartphone as user interface</li>
                </ul>
              </div>
            </div>
          </div>

          {/* OnePortal (bottom left) */}
          <div className="w-full md:w-1/2 bg-navy-blue-dark flex justify-center items-center p-8 order-3 md:order-2">
            <div className="text-white w-3/4 md:w-1/2">
              <img
                src="/external/oneportal-wordmark-white.svg"
                alt="OnePortal logo"
                className="h-10 mb-6"
              />
              <div className="font-sans text-base md:text-lg mt-4">
                <p>
                  Our online user portal bridges the gap between patients and doctors by allowing BioScan test results to be accessed from any computer by trusted contacts.
                </p>
                <ul className="list-disc mt-4">
                  <li>Telemedicine hub</li>
                  <li>Medication intelligence nexus</li>
                  <li>Precision patient management</li>
                  <li>Unified health data repository</li>
                  <li>Enhanced pharmacovigilance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Image (bottom right) */}
          <div className="w-full md:w-1/2 order-2 md:order-3">
            <img
              alt="A computer displaying OnePortal on its screen"
              src="/external/patient-portal-mockup.png"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Products