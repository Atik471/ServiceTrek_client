import DeleteReviews from "./DeleteService";
import { Button } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import UpdateReviews from "./UpdateReviews";

const MyReview = ({ review, reviews, setReviews }) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currReview, setCurrReview] = useState(review);

  return (
    <div>
          {currReview.review}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setUpdateOpen(true)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setDeleteOpen(true)}
          >
            Delete
          </Button>
    
          <UpdateReviews review={currReview} setCurrReview={setCurrReview} open={updateOpen} onClose={() => setUpdateOpen(false)} />
    
          <DeleteReviews review={currReview} reviews={reviews} setReviews={setReviews} open={deleteOpen} onClose={() => setDeleteOpen(false)} />
        </div>
  );
};

MyReview.propTypes = {
  review: PropTypes.object.isRequired,
  reviews: PropTypes.array,
  setReviews: PropTypes.func,
};

export default MyReview;
