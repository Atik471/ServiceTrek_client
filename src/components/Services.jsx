import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { LocationContext } from "../contexts/LocationProvider";
import Service from "./Service";
import { FaSearch } from "react-icons/fa";

const Services = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const serverDomain = useContext(LocationContext);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState(""); 

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

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setPage(1); 
      const response = await axios.get(`${serverDomain}/services/search`, {
        params: {
          title: searchText,
          company: searchText,
          category: searchText,
          page: 1,
          limit,
        },
      });
      console.log(response.data.items); 
  
      setItems(response.data.items); 
      setTotalPages(response.data.totalPages); 
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
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
    <div className="mb-24">
      <Helmet>
        <title>ServiceTrek | Services</title>
      </Helmet>
      <div className="py-4 flex justify-center items-center">
        <form
          onSubmit={handleSearch}
          className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Search by title, company, or category..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full outline-none text-gray-700"
          />
          <button
            type="submit"
            className="text-gray-500 hover:text-gray-700 ml-2"
          >
            <FaSearch size={20} />
          </button>
        </form>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4 md:px-24 px-6">
        {items?.map((item) => (
          <Service key={item._id} service={item}></Service>
        ))}
      </div>
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700 font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Services;
