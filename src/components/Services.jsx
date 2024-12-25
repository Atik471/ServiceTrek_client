import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { LocationContext } from "../contexts/LocationProvider";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const serverDomain = useContext(LocationContext);
  const navigate = useNavigate();

  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${serverDomain}/services?page=${page}&limit=${limit}`
        );
        setItems(response.data.items);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, serverDomain]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
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
    <div>
      <Helmet>
        <title>ServiceTrek | Services</title>
      </Helmet>
      Services
      <h1>Paginated Items</h1>
      <ul>
        {items?.map((item) => (
          <li key={item._id}>
            {item.title}{" "}
            <button onClick={() => navigate(`/service-details/${item._id}`)}>
              See Details
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrev} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Services;
