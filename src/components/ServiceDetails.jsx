import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { LocationContext } from "../contexts/LocationProvider";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";

const ServiceDetails = () => {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const serverDomain = useContext(LocationContext);
  const { user } = useContext(AuthContext);

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

  useEffect(() => {
    const fetchDetails = async() => {
      try {
        const res = await axios.get(`${serverDomain}/services/${id}`)
        setDetails(res.data)
      }
      catch(err) {
        console.log(err);
      }
      finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [id, serverDomain])

  console.log(user.photoURL)

  const onSubmit = async (data) => {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
    const trimmedReview = data.review.trim();
        const review = {...data, review: trimmedReview, UserName: user.displayName, photo: user.photoURL, date: formattedDate}
          await axios.post(`${serverDomain}/reviews/add`, review)
          .then((res) => {
            toast.success("Review posted successfuly!", {
              position: "top-left",
              autoClose: 2000,
            });
            console.log(res.data)
            reset();
          })
          .catch((error) => {
            toast.error(`Failed to post review. Please try again! ${error.message}`, {
              position: "top-left",
              autoClose: 2000,
            });
          });
  }

  
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
        <title>ServiceTrek | Services Details</title>
      </Helmet>
      <p>
        {details.title}
        {details.company}
        {details.category}
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="review">Add your review</label>
        <textarea name="review" id="review" {...register("review", {
          required: "Please add a review"
        })}></textarea>
        {errors.review && <p style={{ color: "red", marginBottom: "10px" }}>{errors.review.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ServiceDetails;
