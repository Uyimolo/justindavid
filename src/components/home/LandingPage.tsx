import About from "./About";
import Hero from "./Hero";
import Works from "./Works";

const LandingPage = () => {
  return (
    <div className="space-y-20 px-5 md:px-10 lg:px-20">
      <Hero />
      <About />
      <Works />
    </div>
  );
};

export default LandingPage;
