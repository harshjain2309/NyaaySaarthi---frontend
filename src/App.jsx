import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-y-scroll h-screen">
        <Header />

        <Hero />

        <Services />

        <Benefits />

        <Footer />
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
