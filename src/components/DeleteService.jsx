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
import { LocationContext } from "../contexts/LocationProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteService = ({ service, services, setServices, open, onClose }) => {
  const serverDomain = useContext(LocationContext);
  const [loading, setLoading] = useState(false);
  const naviagte = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `${serverDomain}/delete-service/${service._id}`, {withCredentials: true}
      );
      setServices(services.filter((item) => item._id !== service._id));
      toast.success("Deleted Successfully!", {
        position: "top-left",
        autoClose: 2000,
      });
      onClose();
    } catch (error) {
      console.error("Failed to delete:", error.message);
      toast.error(`Failed to delete! ${error.message}`, {
        position: "top-left",
        autoClose: 2000,
      });
      if(error.response.status === 401) naviagte('/login');
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
      <DialogTitle>Delete &apos;{service?.title}&apos;?</DialogTitle>
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

DeleteService.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  service: PropTypes.object,
  services: PropTypes.array,
  setServices: PropTypes.func,
};

export default DeleteService;
