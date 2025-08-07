import { curve, heroBackground, robot } from "../assets";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import { motion } from "framer-motion"; // Import Framer Motion

const Hero = () => {
  const parallaxRef = useRef(null);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem] bg-gradient-to-r from-green-300 via-blue-500  to-white" // Apply gradient background here
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <motion.div
          className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 1 }}
        >
          <h1 className="h1 mb-6">
            Explore the Possibilities of&nbsp;AI&nbsp;Chatting with {` `} 
            <motion.span
              className="inline-block relative"
              variants={fadeInUp}
              transition={{ duration: 1.2 }}
            >
              NyaySarthi{" "}
              <motion.img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5 }}
              />
            </motion.span>
          </h1>
          <motion.p
            className="body-1 max-w-3xl mx-auto mb-6 text-n-7 lg:mb-8"
            variants={fadeInUp}
            transition={{ duration: 1.4 }}
          >
            "The Department of Justice (DOJ) in India is transforming the legal framework with AI-driven solutions to ensure swift access to justice. Discover our initiatives in digital reform, legal advancements, and AI chatbot services for improved accessibility."
          </motion.p>
        </motion.div>

        <motion.div
          className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-0 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <motion.img
                  src={robot}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  alt="AI"
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.6 }}
                />
                <ScrollParallax isAbsolutelyPositioned></ScrollParallax>
              </div>
            </div>

            <Gradient />
          </div>

          {/* <motion.img
            src={heroBackground}
            className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]"
            width={1440}
            height={1800}
            alt="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8 }}
          /> */}
          <BackgroundCircles parallaxRef={parallaxRef} />
        </motion.div>
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;
