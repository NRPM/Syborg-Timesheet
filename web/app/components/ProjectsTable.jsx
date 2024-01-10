import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
  Paper,
  Button,
  IconButton,
} from "@mui/material";

const ProjectsTable = ({
  openDialog,
  openDeleteConfirmation,
  projectsList,
}) => {
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "95vh" }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Client Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Project Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Description
                </TableCell>
                {/* <TableCell>Billing</TableCell> */}
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      openDialog(false);
                    }}
                    variant="contained"
                  >
                    <AddCircleIcon
                      fontSize="large"
                      sx={{
                        color: "#07a8ff",
                        backgroundColor: "white",
                        borderRadius: "50%",
                      }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectsList.map((project, index) => (
                <TableRow key={project.id}>
                  <TableCell>{project.clientName}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  {/* <TableCell>
                    {project.isBillable == "true" ? "true" : "false"}
                  </TableCell> */}

                  <TableCell align="center">
                    <IconButton
                      variant="contained"
                      onClick={() => {
                        openDialog(true, index);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      variant="contained"
                      color="error"
                      onClick={() => {
                        openDeleteConfirmation(project.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default ProjectsTable;
