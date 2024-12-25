import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
  } from "@mui/material";
  import axios from "axios";
  import PropTypes from "prop-types";
  
  const DeleteReviews = ({ review, reviews, setReviews, open, onClose }) => {
    const handleDelete = async () => {
      // try {
      //   const response = await axios.delete("/api/delete-item");
      //   console.log("Delete successful:", response.data);
      //   onClose();
      // } catch (error) {
      //   console.error("Failed to delete:", error.message);
      // }
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
      review: PropTypes.object,
      reviews: PropTypes.array,
      setReviews: PropTypes.func,
  }
  
  export default DeleteReviews;
  