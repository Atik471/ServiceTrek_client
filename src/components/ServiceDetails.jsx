import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { LocationContext } from "../contexts/LocationProvider";
import axios from "axios";

const ServiceDetails = () => {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const serverDomain = useContext(LocationContext);
  

  useEffect(() => {
    const fetchDetails = async() => {
      try {
        const res = await axios.get(`${serverDomain}/services/${id}`)
        setDetails(res.data)
        console.log(res.data);
      }
      catch(err) {
        console.log(err);
      }
      finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [id, serverDomain])

  
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
        <title>ServiceTrek | Services Details</title>
      </Helmet>
      <p>
        {details.title}
        {details.company}
        {details.category}
      </p>

      <form>

      </form>
    </div>
  );
};

export default ServiceDetails;
