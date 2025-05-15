import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../contexts/LocationProvider";
import axios from "axios";
import Service from "./Service";
import { motion } from "framer-motion";

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

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:px-16 px-6"
    >
      {services?.map((item) => (
        <motion.div key={item._id} variants={itemVariants}>
          <Service service={item} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TopServices;
