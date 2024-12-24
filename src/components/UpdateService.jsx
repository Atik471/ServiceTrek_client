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

const UpdateService = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/update-item", data); 
      console.log("Update successful:", response.data);
      reset(); 
      onClose(); 
    } catch (error) {
      console.error("Failed to update:", error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Item</DialogTitle>
      <DialogContent>
        <form id="updateForm" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="dense"
            label="Field to Update"
            variant="outlined"
            {...register("field", { required: "This field is required" })}
            error={!!errors.field}
            helperText={errors.field?.message}
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

UpdateService.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default UpdateService;