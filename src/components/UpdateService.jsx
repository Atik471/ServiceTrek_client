import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { LocationContext } from "../contexts/LocationProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateService = ({ service, setCurrservice, open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const serverDomain = useContext(LocationContext);
  const navigate = useNavigate();
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
      await axios.patch(`${serverDomain}/update-service/${service._id}`, data);
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
      if(error.response.status === 401) navigate('/login')
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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div className="text-xl font-semibold text-gray-800">
          Update Item: {service?.title}
        </div>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          maxHeight: "400px",
          overflowY: "auto", 
        }}
      >
        <form id="updateForm" onSubmit={handleSubmit(onSubmit)} >
          <div className="grid grid-cols-1 gap-4">
            <TextField
              label="Service Title"
              variant="outlined"
              fullWidth
              defaultValue={service?.title}
              {...register("title", { required: "Service Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Company Name"
              variant="outlined"
              fullWidth
              defaultValue={service?.company}
              {...register("company", { required: "Company name is required" })}
              error={!!errors.company}
              helperText={errors.company?.message}
            />

            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              defaultValue={service?.imageURL}
              {...register("imageURL")}
            />

            <TextField
              label="Price"
              type="number"
              variant="outlined"
              fullWidth
              defaultValue={service?.price}
              {...register("price", { required: "Price is required" })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              defaultValue={service?.description}
              {...register("description", {
                required: "Description is required",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Website"
              variant="outlined"
              fullWidth
              defaultValue={service?.website}
              {...register("website")}
            />

            <TextField
              select
              label="Service Category"
              variant="outlined"
              fullWidth
              defaultValue={service?.category}
              {...register("category", { required: "Category is required" })}
              error={!!errors.category}
              helperText={errors.category?.message}
            >
              <MenuItem value="">-- Select a Category --</MenuItem>
              {serviceCategories.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form>
      </DialogContent>
      <DialogActions style={{padding: "12px"}}>
        <Button onClick={onClose} color="default" style={{fontWeight: "600"}}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="updateForm"
          variant="contained"
          sx={{
            backgroundColor: "#03853e",
            ":hover": { backgroundColor: "#026f33" },
          }}
          style={{fontWeight: "600"}}
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
