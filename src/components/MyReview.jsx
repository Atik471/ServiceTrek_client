import DeleteReviews from "./DeleteReviews";
import { Button } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import UpdateReviews from "./UpdateReviews";
import ReactStars from "react-stars";

const MyReview = ({ review, reviews, setReviews, setLoading, updateReviewInParent }) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currReview, setCurrReview] = useState(review);

  return (
    <tr className="mx-auto border-t border-gray-300">
      <td className="px-4 py-2 flex items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 mr-3">
          <img
            src={currReview.photoURL || "/assets/pfp.jpg"}
            alt={currReview.UserName}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = "/assets/pfp.jpg")}
          />
        </div>
        {currReview.UserName}
      </td>
      <td className="px-4 py-2">{currReview?.title}</td>
      <td className="px-4 py-2">{currReview.date}</td>
      <td className="px-4 py-2 text-gray-700">{currReview.review}</td>
      <td className="px-4 py-2 text-gray-700">
        <ReactStars
          count={5}
          value={currReview.rating}
          edit={false}
          size={40}
          color2={"#ffd700"}
        />
      </td>
      <td className="flex gap-3 my-4 px-2">
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
          setLoading={setLoading}
          updateReviewInParent={updateReviewInParent}
          onClose={() => setUpdateOpen(false)}
        />

        <DeleteReviews
          review={currReview}
          reviews={reviews}
          setReviews={setReviews}
          open={deleteOpen}
          setLoading={setLoading}
          onClose={() => setDeleteOpen(false)}
        />
      </td>
    </tr>
  );
};

MyReview.propTypes = {
  review: PropTypes.object,
  reviews: PropTypes.array,
  setReviews: PropTypes.func,
  setLoading: PropTypes.func,
  updateReviewInParent: PropTypes.func
};

export default MyReview;
