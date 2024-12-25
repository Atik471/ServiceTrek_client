import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../contexts/LocationProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TopServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const serverDomain = useContext(LocationContext);
  const navigate = useNavigate();

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
      <ul>
        {services?.map((item) => (
          <li key={item._id}>
            {item.title}{" "}
            <button onClick={() => navigate(`/service-details/${item._id}`)}>
              See Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopServices;
