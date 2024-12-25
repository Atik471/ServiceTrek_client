import DeleteReviews from "./DeleteReviews";
import { Button } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import UpdateReviews from "./UpdateReviews";

const MyReview = ({ review, reviews, setReviews }) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currReview, setCurrReview] = useState(review);

  return (
    <div className="bg-white  flex items-start space-x-4 mb-8 shadow-md max-w-[90%] mx-auto rounded-lg p-5">
      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
        <img
          src={currReview.image || "/assets/pfp.jpg"}
          alt={currReview.UserName}
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = "/assets/pfp.jpg")}
        />
      </div>

      <div className="flex-1">
        <div className="mb-2">
          <p className="text-sm text-gray-500">
            {" "}
            <span className=" mr-3 text-sm font-semibold text-gray-800">
              {currReview.UserName}
            </span>
            {currReview.date}
          </p>
        </div>

        <p className=" text-gray-700">{currReview.review}</p>
      </div>
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

      <UpdateReviews
        review={currReview}
        setCurrReview={setCurrReview}
        open={updateOpen}
        onClose={() => setUpdateOpen(false)}
      />

      <DeleteReviews
        review={currReview}
        reviews={reviews}
        setReviews={setReviews}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  );
};

MyReview.propTypes = {
  review: PropTypes.object.isRequired,
  reviews: PropTypes.array,
  setReviews: PropTypes.func,
};

export default MyReview;
