import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { LocationContext } from "../contexts/LocationProvider";
import { toast } from "react-toastify";

const UpdateService = ({ service, setCurrservice, open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const serverDomain = useContext(LocationContext);
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
    "Entertainment & Media",
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.patch(
        `${serverDomain}/update-service/${service._id}`,
        data
      );
      setCurrservice({ ...service, ...data });
      reset();
      onClose();
      toast.success("Update Successful!", {
        position: "top-left",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(`Update Failed! ${error.message}`, {
        position: "top-left",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary border-solid rounded-full animate-spin border-t-transparent"></div>
          <p className="absolute inset-0 flex items-center justify-center text-primary font-semibold text-xl">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Item: {service?.title}</DialogTitle>
      <DialogContent>
        <form id="updateForm" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title">Service Title</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={service?.title}
              {...register("title", {
                required: "Service Title is required",
              })}
            />
            {errors.title && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="company">Company name</label>
            <input
              type="text"
              name="company"
              id="company"
              defaultValue={service?.company}
              {...register("company", {
                required: "Company name is required",
              })}
            />
            {errors.company && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errors.company.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="imageURL">imageURL name</label>
            <input
              type="text"
              name="imageURL"
              id="imageURL"
              defaultValue={service?.imageURL}
              {...register("imageURL")}
            />
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              defaultValue={service?.price}
              {...register("price", {
                required: "Price is required",
              })}
            />
            {errors.price && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              defaultValue={service?.description}
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="website">Website</label>
            <input
              type="text"
              name="website"
              id="website"
              defaultValue={service?.website}
              {...register("website")}
            />
          </div>

          <div>
            <label htmlFor="category">Service Category</label>
            <select
              defaultValue={service?.category}
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="default">
          Cancel
        </Button>
        <Button
          type="submit"
          form="updateForm"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UpdateService.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  service: PropTypes.object,
  setCurrservice: PropTypes.func,
};

export default UpdateService;
