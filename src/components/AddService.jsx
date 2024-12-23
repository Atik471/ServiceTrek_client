import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { LocationContext } from "../contexts/LocationProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthProvider";

const AddService = () => {
  const serverDomain = useContext(LocationContext);
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
    "Entertainment & Media"
  ]

  const onSubmit = async (data) => {
    const now = new Date();
const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
    const service = {...data, UserName: user.displayName, date: formattedDate}
      await axios.post(`${serverDomain}/services/add`, service)
      .then((res) => {
        toast.success("Service added successfuly!", {
          position: "top-left",
          autoClose: 2000,
        });
        console.log(res.data)
        reset();
      })
      .catch((error) => {
        toast.error(`Failed to add service. Please try again! ${error.message}`, {
          position: "top-left",
          autoClose: 2000,
        });
      });
  }

  return (
    <div>
      <Helmet>
        <title>ServiceTrek | Add Service</title>
      </Helmet>
      Add Services
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Service Title</label>
          <input
            type="text"
            name="title"
            id="title"
            {...register("title", {
              required: "Service Title is required",
            })}
          />
          {errors.title && <p style={{ color: "red", marginBottom: "10px" }}>{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="company">Company name</label>
          <input
            type="text"
            name="company"
            id="company"
            {...register("company", {
              required: "Company name is required",
            })}
          />
          {errors.company && <p style={{ color: "red", marginBottom: "10px" }}>{errors.company.message}</p>}
        </div>

        <div>
          <label htmlFor="imageURL">imageURL name</label>
          <input
            type="text"
            name="imageURL"
            id="imageURL"
            {...register("imageURL")}
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            {...register("price", {
              required: "Price is required",
            })}
          />
          {errors.price && <p style={{ color: "red", marginBottom: "10px" }}>{errors.price.message}</p>}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && <p style={{ color: "red", marginBottom: "10px" }}>{errors.description.message}</p>}
        </div>

        <div>
          <label htmlFor="website">Website</label>
          <input
            type="text"
            name="website"
            id="website"
            {...register("website")}
          />
        </div>

        <div>
        <label htmlFor="category">Service Category</label>
          <select
            {...register("category", { required: "Category is required" })}
          >
            <option value="">-- Select a Category --</option>
            {serviceCategories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>

          {errors.category && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {errors.category.message}
            </p>
          )}
        </div>

        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default AddService;
