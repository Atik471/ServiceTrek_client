import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaTag, FaDollarSign } from "react-icons/fa";

const Service = ({ service }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6">
      <img
        src={service.imageURL || "./assets/service_fallback.png"}
        alt={service.displayName}
        onError={(e) => {
          e.target.src = "./assets/service_fallback.png";
        }}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <div className="flex flex-col space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
        {service.description?.length > 100 ? `${service.description.slice(0, 100)}...` : service.description}

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
            <FaTag className="mr-2" /> 
            {service.category}
          </span>
        </div>

        {/* Price with icon */}
        <div className="flex items-center space-x-1">
          <FaDollarSign className="text-primary" />
          <p className="text-lg font-bold text-primary">{service.price}</p>
        </div>
      </div>

      <button
        onClick={() => navigate(`/service-details/${service._id}`)}
        className="font-bold mt-4 w-full py-2 px-4 bg-primary/95 text-white rounded-lg hover:bg-primary transition duration-300"
      >
        See Details
      </button>
    </div>
  );
};

Service.propTypes = {
  service: PropTypes.object.isRequired,
};

export default Service;
