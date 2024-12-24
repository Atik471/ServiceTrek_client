import { Helmet } from "react-helmet-async";
import { Button } from "@mui/material";
import UpdateService from "./UpdateService";
import DeleteService from "./DeleteService";
import { useState } from "react";

const MyServices = () => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div>
      <Helmet>
        <title>ServiceTrek | My Services</title>
      </Helmet>
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

      <UpdateService open={updateOpen} onClose={() => setUpdateOpen(false)} />

      <DeleteService open={deleteOpen} onClose={() => setDeleteOpen(false)} />
    </div>
  );
};

export default MyServices;
