import { Button } from "@mui/material";
import { useState } from "react";
import UpdateService from "./UpdateService";
import DeleteService from "./DeleteService";
import PropTypes from "prop-types";
import { FaDollarSign, FaTag } from "react-icons/fa";

const MyService = ({ service, services, setServices }) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currservice, setCurrservice] = useState(service);

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
        <h3 className="text-sm font-semibold pb-2 text-gray-800">Company: {service.company}</h3>
        {service.description?.length > 100
          ? `${service.description.slice(0, 100)}...`
          : service.description}

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

      <div className="flex gap-3 my-4 px-2">
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
      </div>

      <UpdateService
        service={currservice}
        setCurrservice={setCurrservice}
        open={updateOpen}
        onClose={() => setUpdateOpen(false)}
      />

      <DeleteService
        service={currservice}
        services={services}
        setServices={setServices}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  );
};

MyService.propTypes = {
  service: PropTypes.object.isRequired,
  services: PropTypes.array,
  setServices: PropTypes.func,
};

export default MyService;
