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
import { useContext } from "react";
import { LocationContext } from "../contexts/LocationProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateReviews = ({ review, setCurrReview, open, onClose, setLoading, updateReviewInParent }) => {
  const serverDomain = useContext(LocationContext);
  const navigate = useNavigate();
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
      const updatedReview = { ...review, ...data };
      setCurrReview({ ...review, ...data });
      updateReviewInParent(review._id, updatedReview);

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
  setLoading: PropTypes.func,
  updateReviewInParent: PropTypes.func
};

export default UpdateReviews;
