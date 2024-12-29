import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
  } from "@mui/material";
  import axios from "axios";
  import PropTypes from "prop-types";
import { useContext } from "react";
import { LocationContext } from "../contexts/LocationProvider" 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
  
  const DeleteReviews = ({ review, reviews, setReviews, open, onClose, setLoading }) => {
    const serverDomain = useContext(LocationContext);
    const navigate = useNavigate();

    const handleDelete = async () => {
      setLoading(true);
      console.log(review._id)
      const newReviews = reviews?.filter((item) => item._id !== review._id)
      setReviews(newReviews);
      try {
        const response = await axios.delete(
          `${serverDomain}/delete-review/${review._id}`
        );
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
      setLoading: PropTypes.func
  }
  
  export default DeleteReviews;
  