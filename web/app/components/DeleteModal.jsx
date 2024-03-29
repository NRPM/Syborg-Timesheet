import React from "react";
import { Modal, Box, Button } from "@mui/material";
const DeleteModal = ({ open, onClose, removeProject, delId }) => {
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            border: "2px solid black",
            borderRadius: "10px",
            width: "17rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <Box>Delete Project?</Box>
          <Box>
            <Button
              variant="contained"
              color="error"
              sx={{ margin: "20px" }}
              onClick={() => {
                removeProject(delId);
              }}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              sx={{ margin: "20px" }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteModal;
