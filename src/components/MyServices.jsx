import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { LocationContext } from "../contexts/LocationProvider";
import axios from "axios";
import { toast } from "react-toastify";
import MyService from "./MyService";
import { FaFilter, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const serverDomain = useContext(LocationContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const serviceCategories = [
    "Health & Wellness",
    "Education & Learning",
    "Home & Maintenance",
    "Technology & IT",
    "Automotive Services",
    "Travel & Tourism",
    "Food & Catering",
    "Fashion & Beauty",
    "Event Planning",
    "Sports & Fitness",
    "Finance & Accounting",
    "Entertainment & Media",
  ];

  const updateServiceInParent = (id, updatedService) => {
    setServices((prevServices) =>
      prevServices.map((service) => (service._id === id ? updatedService : service))
    );
  };

  useEffect(() => {
    console.log(category);
    axios
      .get(
        `${serverDomain}/my-services/${user.uid}`,
        { withCredentials: true },
        {
          params: {
            title: searchText,
            company: searchText,
            category: category,
          },
        }
      )
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
        if (err.response.status === 401) navigate("/login");
      });
  }, [serverDomain, user.uid]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const inputValue = e.target.searchInput.value.trim();
    setSearchText(inputValue);
    console.log(searchText);
    try {
      setLoading(true);
      const response = await axios.get(
        `${serverDomain}/my-services/search/${user.uid}`,
        {
          params: {
            title: searchText,
            company: searchText,
            category: category,
          },
        }
      );
      setServices(response.data);
    } catch (err) {
      toast.error(`Failed to fetch your services ${err}`, {
        position: "top-left",
        autoClose: 2000,
      });
      if (err.response.status === 401) navigate("login");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    try {
      setLoading(true);
      const response = await axios.get(
        `${serverDomain}/my-services/search/${user.uid}`,
        {
          params: {
            title: searchText,
            company: searchText,
            category: selectedCategory,
          },
        }
      );
      setServices(response.data);
    } catch (err) {
      toast.error(`Failed to fetch your services ${err}`, {
        position: "top-left",
        autoClose: 2000,
      });
      if (err.response.status === 401) navigate("login");
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
  <div className="flex-grow my-8">
    <Helmet>
      <title>ServiceTrek | My Services</title>
    </Helmet>

    {/* Search Form */}
    <div className="py-4 px-4 sm:px-6 flex justify-center items-center">
      <form
        onSubmit={handleSearch}
        className="flex w-full max-w-md items-center border border-gray-300 rounded-lg px-3 py-2"
      >
        <input
          type="text"
          placeholder="Search by title, company, or category..."
          value={searchText}
          name="searchInput"
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

    {/* Filter */}
    <div className="py-4 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-2">
      <label className="flex items-center text-gray-700">
        <FaFilter size={18} className="mr-2" />
        Filter by category
      </label>
      <select
        value={category}
        onChange={handleCategoryChange}
        className="border border-gray-300 rounded-lg px-2 py-1"
      >
        <option value="">All Categories</option>
        {serviceCategories.map((categoryName, index) => (
          <option key={index} value={categoryName}>
            {categoryName}
          </option>
        ))}
      </select>
    </div>

    {/* Table */}
    {services && services.length > 0 ? (
      <div className="overflow-x-auto px-4 sm:px-6">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-sm sm:text-base">
              <th className="px-4 py-2 text-left whitespace-nowrap">Service Title</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">Company</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">Category</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">Price</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">Description</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <MyService
                key={index}
                service={service}
                services={services}
                setServices={setServices}
                setLoading={setLoading}
                updateServiceInParent={updateServiceInParent}
              />
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-center text-gray-600 mt-6">No services found.</p>
    )}
  </div>
);

};

export default MyServices;
