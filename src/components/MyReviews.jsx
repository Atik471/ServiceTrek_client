import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LocationContext } from "../contexts/LocationProvider";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import MyReview from "./MyReview";
import { useNavigate } from "react-router-dom";

const MyReviews = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const serverDomain = useContext(LocationContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const updateReviewInParent = (id, updatedReview) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) => (review._id === id ? updatedReview : review))
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${serverDomain}/my-reviews/${user.uid}`);
        setReviews(res.data);
      } catch (err) {
        toast.error(`Failed to fetch your services ${err}`, {
          position: "top-left",
          autoClose: 2000,
        });
        if(err.response.status === 401) navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serverDomain, user.uid]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative">
          <div className="w-28 h-28 border-8 border-primary border-solid rounded-full animate-spin border-t-transparent"></div>
          <p className="absolute inset-0 flex items-center justify-center text-primary font-semibold text-xl">
            Loading...
          </p>
        </div>
      </div>
    );
  }

return (
  <div className="flex-grow my-12">
    <Helmet>
      <title>ServiceTrek | My Reviews</title>
    </Helmet>

    {reviews && reviews.length > 0 ? (
      <div className="mt-12 px-4 sm:px-6 overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-sm sm:text-base">
              <th className="px-4 py-2 text-left whitespace-nowrap">User</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">Service</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">Date</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">Review</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">Rating</th>
              <th className="px-4 py-2 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <MyReview
                key={index}
                review={review}
                reviews={reviews}
                setReviews={setReviews}
                setLoading={setLoading}
                updateReviewInParent={updateReviewInParent}
                className="border-t border-gray-300"
              />
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-center text-gray-600 mt-6">No reviews found.</p>
    )}
  </div>
);

};

export default MyReviews;
