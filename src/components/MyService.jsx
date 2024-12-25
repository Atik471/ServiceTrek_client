import { Button } from "@mui/material";
import { useState } from "react";
import UpdateService from "./UpdateService";
import DeleteService from "./DeleteService";
import PropTypes from "prop-types";

const MyService = ({ service, services, setServices }) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currservice, setCurrservice] = useState(service);

  console.log(service)

  return (
    <div>
      {currservice.title}
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

      <UpdateService service={currservice} setCurrservice={setCurrservice} open={updateOpen} onClose={() => setUpdateOpen(false)} />

      <DeleteService service={currservice} services={services} setServices={setServices} open={deleteOpen} onClose={() => setDeleteOpen(false)} />
    </div>
  );
};

MyService.propTypes = {
  service: PropTypes.object.isRequired,
  services: PropTypes.array,
  setServices: PropTypes.func,
};

export default MyService;
