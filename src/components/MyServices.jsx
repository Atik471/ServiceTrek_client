import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { LocationContext } from "../contexts/LocationProvider";
import axios from "axios";
import { toast } from "react-toastify";
import MyService from "./MyService";
import { FaFilter, FaSearch } from "react-icons/fa";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const serverDomain = useContext(LocationContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

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

  useEffect(() => {
    console.log(category)
    axios
      .get(`${serverDomain}/my-services/${user.uid}`,
        {
          params: {
            title: searchText,
            company: searchText,
            category: category,
          },
        })
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

  const handleSearch = async (e) => {
    e.preventDefault();
    const inputValue = e.target.searchInput.value.trim(); 
    setSearchText(inputValue); 
    console.log(searchText) 
    try {
      setLoading(true);
      const response = await axios.get(`${serverDomain}/my-services/search/${user.uid}`, {
        params: {
          title: searchText,
          company: searchText,
          category: category,
        },
      });
      setServices(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value; 
    setCategory(selectedCategory);   
    try {
      setLoading(true);
      const response = await axios.get(`${serverDomain}/my-services/search/${user.uid}`, {
        params: {
          title: searchText, 
          company: searchText, 
          category: selectedCategory, 
        },
      });
      console.log(response.data)
      setServices(response.data); 
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };
  

  // const handleCategoryReset = async () => {
  //   setCategory("");
  //   // handleCategoryChange()
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(`${serverDomain}/my-services/search/${user.uid}`, {
  //       params: {
  //         title: searchText, 
  //         company: searchText, 
  //         category: serviceCategories, 
  //       },
  //     });
  //     console.log(response.data)
  //     setServices(response.data); 
  //   } catch (err) {
  //     console.error("Error fetching data:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

      <div className="py-4 flex justify-center items-center">
        <form
          onSubmit={handleSearch}
          className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-md"
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
      <div className="py-4 flex justify-center items-center">
        <label className="mr-2 flex items-center text-gray-700">
          <FaFilter size={18} className="mr-2" />
          Filter by category
        </label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="border border-gray-300 rounded-lg px-2 py-1 ml-2"
        >
          <option value="">All Categories</option>
          {serviceCategories.map((categoryName, index) => (
            <option key={index} value={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>

        {/* {category && (
          <button
            onClick={handleCategoryReset}
            className="ml-2 text-sm text-red-500 hover:text-red-700"
          >
            Reset category
          </button>
        )} */}
      </div>
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
