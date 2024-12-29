import { Button } from "@mui/material";
import { useState } from "react";
import UpdateService from "./UpdateService";
import DeleteService from "./DeleteService";
import PropTypes from "prop-types";

const MyService = ({ service, services, setServices, setLoading, updateServiceInParent }) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currservice, setCurrservice] = useState(service);

  return (
    <tr className="mx-auto border-t border-gray-300">
      <td className="px-4 py-2">{currservice?.title}</td>
      <td className="px-4 py-2">{currservice?.company}</td>
      <td className="px-4 py-2">{currservice?.category}</td>
      <td className="px-4 py-2">{currservice?.price}</td>
      <td className="px-4 py-2">
        {currservice.description?.length > 100
          ? `${currservice.description.slice(0, 100)}...`
          : currservice.description}
      </td>
      <td className="px-4 py-2">
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
          <UpdateService
            service={currservice}
            setCurrservice={setCurrservice}
            open={updateOpen}
            setLoading={setLoading}
            updateServiceInParent={updateServiceInParent}
            onClose={() => setUpdateOpen(false)}
          />

          <DeleteService
            service={currservice}
            services={services}
            setServices={setServices}
            open={deleteOpen}
            setLoading={setLoading}
            onClose={() => setDeleteOpen(false)}
          />
        </div>
      </td>
    </tr>
  );
};

MyService.propTypes = {
  service: PropTypes.object.isRequired,
  services: PropTypes.array,
  setServices: PropTypes.func,
  setLoading: PropTypes.func,
  updateServiceInParent: PropTypes.func
};

export default MyService;
