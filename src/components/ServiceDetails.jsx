import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { LocationContext } from "../contexts/LocationProvider";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import Review from "./Review";

const ServiceDetails = () => {
  const [details, setDetails] = useState();
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const serverDomain = useContext(LocationContext);
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${serverDomain}/services/${id}`);
        setDetails(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, serverDomain]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${serverDomain}/reviews/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchReviews();
  }, [id, serverDomain]);

  const onSubmit = async (data) => {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, "0")}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${now.getFullYear()}`;
    const trimmedReview = data.review.trim();
    const review = {
      ...data,
      serviceId: id,
      review: trimmedReview,
      UserName: user.displayName,
      uid: user.uid,
      photo: user.photoURL,
      date: formattedDate,
    };
    await axios
      .post(`${serverDomain}/reviews/add`, review)
      .then(() => {
        toast.success("Review posted successfuly!", {
          position: "top-left",
          autoClose: 2000,
        });
        setReviews([...reviews, data]);
        reset();
      })
      .catch((error) => {
        toast.error(
          `Failed to post review. Please try again! ${error.message}`,
          {
            position: "top-left",
            autoClose: 2000,
          }
        );
      });
  };

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
    <div className="md:p-6 pt-6 md:max-w-[90%] max-w-[90%] mx-auto">
      <Helmet>
        <title>ServiceTrek | Services Details</title>
      </Helmet>
      <div className="bg-white md:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-full md:w-1/3">
            <img
              src={details.imageURL || "/assets/service_fallback.png"}
              alt={details.title}
              className="w-full h-64 object-cover rounded-md border border-gray-200"
              onError={(e) => (e.target.src = "/assets/service_fallback.png")}
            />
          </div>

          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-semibold text-gray-800">
              {details.title}
            </h1>
            <p className="text-sm text-gray-600">By: {details.UserName}</p>
            <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block">
              Category: {details.category}
            </p>
            <p className="text-gray-700">{details.description}</p>
            <div className="text-lg font-bold text-primary">
              Price: ${details.price}
            </div>
            <a
              href={details.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Visit Website
            </a>
            <p className="text-sm text-gray-500">Company: {details.company}</p>
            <p className="text-sm text-gray-500">Date: {details.date}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md md:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add Your Review
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700"
            >
              Your Review
            </label>
            <textarea
              id="review"
              name="review"
              rows="3"
              className="md:w-[80%] w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("review", {
                required: "Please add a review",
              })}
            ></textarea>
            {errors.review && (
              <p className="text-red-500 text-sm mt-1">
                {errors.review.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="p-6">
        {reviews?.map((item, index) => (
          <Review key={index} review={item}></Review>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetails;
