import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { LocationContext } from "../contexts/LocationProvider";
import axios from "axios";
import { toast } from "react-toastify";
import MyService from "./MyService";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const serverDomain = useContext(LocationContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${serverDomain}/my-services/${user.uid}`)
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(`Failed to fetch your services ${err}`, {
          position: "top-left",
          autoClose: 2000,
        });
        setLoading(false);
      });
  }, [serverDomain, user.uid]);

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
      <Helmet>
        <title>ServiceTrek | My Services</title>
      </Helmet>

      {services && services.length > 0 ? (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 md:px-24 px-6">
          {services.map((service, index) => (
            <MyService
              key={index}
              service={service}
              services={services}
              setServices={setServices}
            />
          ))}
        </div>
      ) : (
        <p>No services found.</p>
      )}
    </div>
  );
};

export default MyServices;
