import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { motion } from "framer-motion"; // Importing Framer Motion

const Benefits = () => {
  return (
    <Section
      id="features"
      className="bg-gradient-to-r from-green-300 via-blue-500  to-white" // Apply gradient background here
    >
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Chat Smarter, Not Harder with NyaySarthi"
        />

        <div className="flex flex-wrap gap-10 mb-10">
          {benefits.map((item) => (
            <motion.div
              key={item.id}
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] rounded-xl"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              initial={{ opacity: 0, y: 50 }} // Animates into view on scroll
              whileInView={{ opacity: 1, y: 0 }} // Visible with smooth transition
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }} // Subtle hover scaling
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none bg-n-8 rounded-xl">
                <h5 className="h5 mb-5 text-n-1">{item.title}</h5>
                <p className="body-2 mb-6 text-n-1">{item.text}</p>
                <div className="flex items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  />
                  <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                    Explore more
                  </p>
                  <Arrow />
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-black rounded-xl"
                style={{ clipPath: "url(#benefits)" }}
              >
                {/* Hover effect to show image */}
                <motion.div
                  className="absolute inset-0 opacity-0 transition-opacity hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }} // Image fades in on hover
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              </div>

              <ClipPath />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
