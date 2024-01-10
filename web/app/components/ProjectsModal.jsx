import React, { useEffect, useState, useId } from "react";
import getProjectById from "../services/getProjectById";
import getClients from "../services/getClients";
import { modalSchema } from "../validations/modalValidation";
import * as yup from "yup";
import {
  Modal,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  RadioGroup,
  Radio,
  Box,
  Autocomplete,
} from "@mui/material";

const ProjectsModal = ({
  open,
  onClose,
  addToProjectList,
  isEditing,
  currentIndex,
  projectsList,
  clientsList,
  updateProjectsList,
}) => {
  // console.log(isEditing);
  const [projectData, setProjectData] = useState(null);
  const [projectDataErrors, setProjectDataErrors] = useState({});
  const [autoVal, setAutoVal] = useState({});
  // useEffect(() => {
  //   let temp = clientsList.filter(
  //     (client) => client.label == projectData?.clientName
  //   )[0];
  //   console.log(temp);
  //   setAutoVal(temp);
  // });

  useEffect(() => {
    // debugger;
    let res = {};
    if (isEditing) {
      let getProjectByIdCall = async (id) => {
        res = await getProjectById(id);
        // console.log(res.status);
        if (res.status == 200) {
          setProjectData({
            ...res.data,
            clientName: res.data.client.name,
            isBillable: true, //this value is not present in timesheet notion
          });
          // console.log(res.data.client.name);
          console.log("data fetched successfully");
        } else {
          console.log("data could not be fetched");
        }

        console.log(clientsList);
        // setAutoVal(temp);
      };
      getProjectByIdCall(123);

      // setProjectData(projectsList[currentIndex]);
      // console.log(currentIndex);
    } else {
      setProjectData({
        clientName: "",
        name: "",
        isBillable: false,
        description: "",
        id: "",
      });
    }
  }, [isEditing]);

  // const id = useId();

  function handleChange(e) {
    let ex = { ...projectData };
    console.log(e.target.name);
    let validationErrors = { ...projectDataErrors };
    ex[e.target.name] = e.target.value;

    try {
      modalSchema.validateSyncAt(e.target.name, ex);
      validationErrors[e.target.name] = [];
    } catch (error) {
      validationErrors[e.target.name] = error.errors;
    }
    setProjectDataErrors(validationErrors);
    setProjectData(ex);
  }

  function addProject() {
    let ex = { ...projectData, id: crypto.randomUUID() };
    try {
      modalSchema.validateSync(projectData, { abortEarly: false });
      console.log("project added");
      addToProjectList(ex);
      setProjectData(ex);
      onClose();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // console.log(error.inner);
        let validationErrors = {};
        error.inner.forEach((vError) => {
          validationErrors[vError.path] = vError.errors;
        });
        setProjectDataErrors(validationErrors);
      }
    }
  }

  function saveChanges(projectData) {
    try {
      modalSchema.validateSync(projectData, { abortEarly: false });
      updateProjectsList(projectData);
      onClose();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        let validationErrors = {};
        error.inner.forEach((vError) => {
          validationErrors[vError.path] = vError.errors;
        });
        setProjectDataErrors(validationErrors);
      }
    }
  }

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
            width: "auto",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <FormControl size="medium">
            <Autocomplete
              disablePortal
              options={clientsList}
              getOptionLabel={(option) => option?.label}
              sx={{ width: "23rem" }}
              value={autoVal}
              onChange={(e, val) => {
                console.log(val);
                setProjectDataErrors((prev) => ({ ...prev, clientName: [] }));
                setProjectData((prev) => ({ ...prev, clientName: val?.label }));
                setAutoVal(val);
              }}
              // isOptionEqualToValue={(option, value) =>
              //   option.label == value.label
              // }
              name="clientName"
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="clientName"
                  value={projectData.clientName}
                  onChange={handleChange}
                  error={projectDataErrors?.clientName?.length ? true : false}
                  label="Client Name"
                />
              )}
            />

            <TextField
              sx={{ width: "auto", marginTop: "1rem", marginBottom: "1rem" }}
              fullWidth
              label="Project Name"
              onChange={handleChange}
              name="name"
              error={projectDataErrors?.name?.length ? true : false}
              value={projectData?.name}
            />
            {/* <RadioGroup
            value={projectData?.isBillable}
            name="isBillable"
            onChange={handleChange}
          >
            <FormControlLabel
              control={<Radio />}
              value={false}
              label="Non Billable"
            >
              Non Billable
            </FormControlLabel>
            <FormControlLabel control={<Radio />} value={true} label="Billable">
              Billable
            </FormControlLabel>
          </RadioGroup> */}
            <TextField
              sx={{ width: "auto", marginTop: "1rem", marginBottom: "1rem" }}
              fullWidth
              label="Description"
              onChange={handleChange}
              name="description"
              error={projectDataErrors?.description?.length ? true : false}
              value={projectData?.description}
            />
          </FormControl>

          <Box>
            <Button
              variant="contained"
              sx={{ float: "right" }}
              onClick={
                isEditing
                  ? () => {
                      saveChanges(projectData);
                    }
                  : addProject
              }
            >
              {isEditing ? "Save Changes" : "Add Project"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProjectsModal;
