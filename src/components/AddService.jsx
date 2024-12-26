import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { LocationContext } from "../contexts/LocationProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthProvider";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const serverDomain = useContext(LocationContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
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
    "Entertainment & Media"
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
    const service = { ...data, UserName: user.displayName, date: formattedDate, uid: user.uid };

    await axios.post(`${serverDomain}/services/add`, service, {withCredentials: true})
      .then(() => {
        toast.success("Service added successfully!", {
          position: "top-left",
          autoClose: 2000,
        });
        setLoading(false);
        reset();
      })
      .catch((error) => {
        toast.error(`Failed to add service. Please try again! ${error.message}`, {
          position: "top-left",
          autoClose: 2000,
        });
        setLoading(false);
        if(error.response.status === 401) navigate('/login')
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-[94%] md:max-w-[80%] mx-auto mt-[2rem]">
      <Helmet>
        <title>ServiceTrek | Add Service</title>
      </Helmet>
      <h2 className="text-2xl font-bold text-black mb-6">Add Service</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          label="Service Title"
          variant="outlined"
          fullWidth
          {...register("title", { required: "Service Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{
            input: {
              borderRadius: 0, 
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
            },
          }}
        />

        <TextField
          label="Company Name"
          variant="outlined"
          fullWidth
          {...register("company", { required: "Company name is required" })}
          error={!!errors.company}
          helperText={errors.company?.message}
          sx={{
            input: {
              borderRadius: 0,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
            },
          }}
        />

        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          {...register("imageURL")}
          sx={{
            input: {
              borderRadius: 0,  
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
            },
          }}
        />

        <TextField
          label="Price"
          variant="outlined"
          type="number"
          fullWidth
          {...register("price", { required: "Price is required" })}
          error={!!errors.price}
          helperText={errors.price?.message}
          sx={{
            input: {
              borderRadius: 0,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 0, 
            },
          }}
        />

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          {...register("description", { required: "Description is required" })}
          error={!!errors.description}
          helperText={errors.description?.message}
          sx={{
            input: {
              borderRadius: 0, 
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
            },
          }}
        />

        <TextField
          label="Website"
          variant="outlined"
          fullWidth
          {...register("website")}
          sx={{
            input: {
              borderRadius: 0, 
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 0, 
            },
          }}
        />

        <FormControl fullWidth>
          <InputLabel id="category">Service Category</InputLabel>
          <Select
            labelId="category"
            {...register("category", { required: "Category is required" })}
            label="Service Category"
            sx={{
              borderRadius: 0,
            }}
          >
            <MenuItem value="">-- Select a Category --</MenuItem>
            {serviceCategories.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          {errors.category && (
            <p style={{ color: "red", marginTop: "5px" }}>{errors.category.message}</p>
          )}
        </FormControl>



        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: "#03853e",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#026d2d",
            },
          }}
          style={{paddingTop: "12px", paddingBottom: "12px" }}
        >
          Add Service
        </Button>
      </form>
    </div>
  );
};

export default AddService;
