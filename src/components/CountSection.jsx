import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { LocationContext } from "../contexts/LocationProvider";

const CountSection = () => {
  const [counts, setCounts] = useState({ reviews: 0, services: 0 });
  const [loading, setLoading] = useState(true);
  const serverDomain = useContext(LocationContext);
  
  // Fetch counts data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverDomain}/count`); // Adjust URL if needed
        setCounts({
          reviews: response.data.reviews,
          services: response.data.services,
          user: response.data.user
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching count data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Our Platform Stats</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Total Reviews</h3>
            <div className="text-4xl text-primary font-bold">
              <CountUp start={0} end={counts.reviews} duration={15} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Total Services</h3>
            <div className="text-4xl text-primary font-bold">
              <CountUp start={0} end={counts.services} duration={15} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Total Users</h3>
            <div className="text-4xl text-primary font-bold">
              <CountUp start={0} end={counts.user} duration={15} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountSection;
