import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../contexts/LocationProvider";
import axios from "axios";
import Service from "./Service";

const TopServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const serverDomain = useContext(LocationContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${serverDomain}/top-services`);
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serverDomain]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative">
          <div className="w-28 h-28 border-8 border-primary border-solid rounded-full animate-spin border-t-transparent"></div>
          <p className="absolute inset-0 flex items-center justify-center text-primary font-semibold text-xl">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 md:px-24 px-6">
              {services?.map((item) => (
                <Service key={item._id} service={item}></Service>
              ))}
            </div>
    </div>
  );
};

export default TopServices;
