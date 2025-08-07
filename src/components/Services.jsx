import Section from "./Section";
import Heading from "./Heading";
import { service1, check } from "../assets";
import { dojServices } from "../constants";
import Chatbot from "./Chatbot";
import { motion } from "framer-motion"; // Import Framer Motion

const Services = () => {
  return (
    <Section
      id="doj-services"
      className="pt-10 lg:pt-20 bg-gradient-to-r from-green-300 via-blue-500  to-white" // Example gradient
    >
      <div className="container mx-auto">
        {/* Apply motion for heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading
            title="Services Offered by the Department of Justice AI Chatbot"
            text="Access essential legal services, case information, and judiciary updates at your fingertips."
          />
        </motion.div>

        <motion.div
          className="relative mt-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Image and Services List */}
          <div className="relative z-1 flex flex-col lg:flex-row items-center h-auto mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20">
            {/* Image Section */}
            <div className="w-full lg:w-1/2">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={service1}
                alt="DoJ Services"
              />
            </div>
            
            {/* Services List Section */}
            <div className="w-full lg:w-1/2 mt-6 lg:mt-0 lg:ml-10">
              <h4 className="h4 mb-4 text-center lg:text-left">Key DoJ Services</h4>
              <ul className="body-2">
                {dojServices.map((service, index) => (
                  <li
                    key={index}
                    className="flex items-center py-4 border-t border-n-6"
                  >
                    <img width={24} height={24} src={check} alt="check" />
                    <p className="ml-4 text-2xl">{service}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Chatbot Section */}
          <motion.div
            className="mb-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Your Chatbot Component or Content */}
          </motion.div>
        </motion.div>
        <Chatbot />
      </div>
    </Section>
  );
};

export default Services;
