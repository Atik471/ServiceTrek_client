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
    <tr className="mx-auto border-t border-gray-300">
      <td className="px-4 py-2 flex items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 mr-3">
          <img
            src={currReview.image || "/assets/pfp.jpg"}
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
      <td className="px-4 py-2 flex gap-3">
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
      </td>
    </tr>
  );
};

MyReview.propTypes = {
  review: PropTypes.object,
  reviews: PropTypes.array,
  setReviews: PropTypes.func,
};

export default MyReview;
