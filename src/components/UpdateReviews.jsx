import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { LocationContext } from "../contexts/LocationProvider";
import { toast } from "react-toastify";

const UpdateReviews = ({ review, setCurrReview, open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const serverDomain = useContext(LocationContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.patch(`${serverDomain}/update-review/${review._id}`, data);
      setCurrReview({ ...review, ...data });
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
      <DialogTitle>Update Review</DialogTitle>
      <DialogContent>
        <form id="updateForm" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="dense"
            label="Review to Update"
            variant="outlined"
            defaultValue={review.review}
            {...register("review", { required: "This field is required" })}
            error={!!errors.review}
            helperText={errors.review?.message}
          />
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

UpdateReviews.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  setCurrReview: PropTypes.func.isRequired,
};

export default UpdateReviews;
