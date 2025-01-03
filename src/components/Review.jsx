import PropTypes from "prop-types";
import ReactStars from "react-stars";

const Review = ({ review }) => {
  return (
    <div className="bg-white  flex items-start space-x-4 mb-8">
      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
        <img
          src={review.photoURL || "/assets/pfp.jpg"}
          alt={review.UserName}
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = "/assets/pfp.jpg")}
        />
      </div>

      <div className="flex-1">
        <div className="mb-2">
          <p className="text-sm text-gray-500"> <span className=" mr-3 text-sm font-semibold text-gray-800">
            {review.UserName}
          </span>{review.date}</p>
        </div>

        <p className=" text-gray-700">{review.review}</p>
        <ReactStars
            count={5} 
            value={review?.rating} 
            edit={false}
            size={40}
            color2={"#ffd700"}
          />
      </div>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.object.isRequired,
};

export default Review;
