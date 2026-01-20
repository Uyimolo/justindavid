import About from "./About";
import Hero from "./Hero";
import Works from "./Works";

const LandingPage = () => {
  return (
    <main className="space-y-20 md:space-y-40 max-w-[1700px] mx-auto px-5 md:px-10 lg:px-20">
      <Hero />
      <About />
      <Works />
    </main>
  );
};

export default LandingPage;
