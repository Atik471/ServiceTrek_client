import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Partners from "./Partners";
import TopServices from "./TopServices";
import CountSection from "./CountSection";
import OurStorySection from "./OurStorySection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>ServiceTrek | Home</title>
      </Helmet>
      <Banner></Banner>
      <div className="my-16">
        <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">
          Explore Services
        </h2>
      </div>
      <TopServices></TopServices>
      <Partners></Partners>
      <CountSection></CountSection>
      <OurStorySection></OurStorySection>
    </div>
  );
};

export default Home;
