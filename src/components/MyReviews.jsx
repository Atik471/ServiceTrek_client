import { Helmet } from "react-helmet-async";
import MyReview from "./MyReview";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LocationContext } from "../contexts/LocationProvider";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";

const MyReviews = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const serverDomain = useContext(LocationContext);
  const { user } = useContext(AuthContext);

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serverDomain, user.uid])

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
    <div>
      <Helmet>
        <title>ServiceTrek | My Reviews</title>
      </Helmet>

      {reviews && reviews.length > 0 ? (
        <div className="mt-12">
          {
            reviews.map((review, index) => (
              <MyReview
                key={index}
                review={review}
                reviews={reviews}
                setReviews={setReviews}
              />
            ))
          }
        </div>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};

export default MyReviews;
