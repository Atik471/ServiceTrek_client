import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
  } from "@mui/material";
  import axios from "axios";
  import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { LocationContext } from "../contexts/LocationProvider" 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
  
  const DeleteReviews = ({ review, reviews, setReviews, open, onClose }) => {
    const [loading, setLoading] = useState(false);
    const serverDomain = useContext(LocationContext);
    const navigate = useNavigate();

    const handleDelete = async () => {
      setLoading(true);
      console.log(review._id)
      try {
        const response = await axios.delete(
          `${serverDomain}/delete-review/${review._id}`
        );
        setReviews(reviews?.filter((item) => item._id !== review._id));
        toast.success("Deleted Successfully!", {
          position: "top-left",
          autoClose: 2000,
        });
  
        console.log("Delete successful:", response.data);
        onClose();
      } catch (error) {
        console.error("Failed to delete:", error.message);
        toast.error(`Failed to delete! ${error.message}`, {
          position: "top-left",
          autoClose: 2000,
        });
        if(error.response.status === 401)navigate('/login');
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
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this item?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="default">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  DeleteReviews.propTypes = {
      open: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
      review: PropTypes.object.isRequired,
      reviews: PropTypes.array,
      setReviews: PropTypes.func,
  }
  
  export default DeleteReviews;
  