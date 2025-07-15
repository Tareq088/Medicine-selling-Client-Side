import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";


const SpecialOffer = () => {
  return (
    <div className="bg-base-200">
      <div className="max-w-11/12 mx-auto pb-10">
        <h2 className="sm:text-lg md:text-2xl lg:text-4xl font-extrabold text-center mb-4 text-red-700">
          Special Offers
        </h2>
        <div className="flex flex-col gap-10 sm:flex-row">
          <motion.div 
          whileHover={{scale:1.05, y:-5}} 
          transition={{type:"spring", stiffness: 300}}
          className="card p-5 bg-red-50 shadow-sm flex flex-1 flex-col items-center justify-center">
            <div className="flex flex-col items-center text-center space-y-3">
              <h2 className="font-bold text-lg">First Booking Events</h2>
              <p className="">
                Enjoy special discounts and a welcome gift as a token of appreciation for choosing us. Start your journey with savings and surprises!
              </p>
              <Link to="/shop">
                <button className="btn btn-primary text-black text-sm sm:text-base">
                  Buy Now
                </button>
              </Link>
            </div>
          </motion.div>
          <motion.div  whileHover={{scale:1.05, y:-5}} 
          transition={{type:"spring", stiffness: 300}}  className="card p-5 bg-red-50 shadow-sm flex flex-1 flex-col items-center justify-center">
            
            <div className="flex flex-col items-center text-center space-y-3">
              <h2 className="font-bold text-lg">Regular Customer</h2>
              <p className="">
                Loyalty has its rewards! As a regular customer, you’ll receive priority service, personalized offers, and consistent discounts tailored just for you. The more you shop, the more you save.
              </p>
              <Link to="/shop">
                <button className="btn btn-primary text-black hover:text-white text-sm sm:text-base">
                  Buy Now
                </button>
              </Link>
            </div>
          </motion.div >
          <motion.div  whileHover={{scale:1.05, y:-5}} 
          transition={{type:"spring", stiffness: 300}}  className="card p-5 bg-red-50 shadow-sm flex flex-1 flex-col items-center justify-center">
            
            <div className="flex flex-col items-center text-center space-y-3">
              <h2 className="font-bold text-lg">Specials Offers for Bulk Consumer</h2>
              <p className="">
               Planning a large order? We offer special pricing and custom deals for bulk consumers. Whether you're stocking up for a business or an event, benefit from competitive rates and dedicated support.
              </p>
              <Link to="/shop">
                <button className="btn btn-primary text-black hover:text-white text-sm sm:text-base">
                  Buy Now
                </button>
              </Link>
            </div>
          </motion.div >
          <motion.div  whileHover={{scale:1.05, y:-5}} 
          transition={{type:"spring", stiffness: 300}}  className="card p-5 bg-red-50 shadow-sm flex flex-1 flex-col items-center justify-center">
            
            <div className="flex flex-col items-center text-center space-y-3">
              <h2 className="font-bold text-lg">Seasonal discounts</h2>
              <p className="">
                 Celebrate every season with us! Take advantage of our seasonal discounts during festivals, holidays, and special occasions. Stay tuned to grab limited-time offers throughout the year.
              </p>
              <Link to="/shop">
                <button className="btn btn-primary text-black hover:text-white text-sm sm:text-base">
                  Buy Now
                </button>
              </Link>
            </div>
          </motion.div >
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
