"use client";
import getApiData from "../services/getProjectsList";
import getClients from "../services/getClients";
import deleteProject from "../services/deleteProject";
import React, { useEffect, useState } from "react";

import ProjectsModal from "../components/ProjectsModal";
import ProjectsTable from "../components/ProjectsTable";
import { produce } from "immer";
import DeleteModal from "../components/DeleteModal";
import axios from "axios";
import { Pagination } from "@mui/material";
import addProject from "../services/addProject";
import updateProject from "../services/updateProject";

const ProjectsPage = () => {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [clientsList, setClientsList] = useState([]);

  const [projectsList, setProjectsList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [delId, setDelId] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  let temp = [];

  // const getApiData = async (pageNo, pageSize) => {
  //   let res = await axios.get(
  //     `http://localhost:5001/project/getprojectlist?page=${pageNo}&pageSize=${pageSize}`
  //   );
  //   setPage(res.data.currentPage);
  //   setProjectsList(res.data);
  // };
  async function fetchClients() {
    try {
      let res = await getClients();

      let clientNameList = res.data.map((client, index) => ({
        label: client.name,
      }));
      setClientsList(clientNameList);

      // console.log(clientNameList);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // console.log(clientsList);
    temp = clientsList;
  }, [clientsList]);

  useEffect(() => {
    let apiCall = async () => {
      let res = await getApiData(1, PAGE_SIZE);
      // console.log(res.data.items);
      setPage(res.data.currentPage);
      setProjectsList(res.data);
    };

    apiCall();
    // setProjectsList(data);
  }, []);
  // console.log(myData);

  function openDialog(editing = false, index = 0) {
    fetchClients();
    setCurrentIndex(index);
    setIsEditing(editing);
    setOpen(true);
  }
  // console.log(clientsList);
  async function addToProjectList(projectData) {
    try {
      let res = await addProject(projectData);
      console.log(res);
      // console.log("value added successfully");
    } catch (error) {
      console.log(error);
    }
    // setProjectsList((prev) => ({
    //   ...prev,
    //   items: [...prev.items, projectData],
    // }));
  }

  async function updateProjectsList(updatedProject) {
    let res = await updateProject(updatedProject.id);
    console.log(res);
    setProjectsList(
      produce((draft) => {
        draft.items.splice(currentIndex, 1, updatedProject);
      })
    );
  }

  function handleClose() {
    setOpen(false);
    setIsEditing(false);
  }

  async function removeProject(id) {
    try {
      let res = await deleteProject(id);
      console.log(res);
      console.log("project deleted");
    } catch (error) {
      console.log(error);
    }

    //send post request containing id to be deleted
    // axios.post(`http://localhost:5001/project/deleteproject/${id}`)

    // setProjectsList((prev) => {
    //   prev.items = prev.items.filter((project) => project.id != id);
    //   return prev;
    // });
    setOpenDeleteModal(false);
  }

  function openDeleteConfirmation(id) {
    setOpenDeleteModal(true);
    setDelId(id);
    // console.log(confirmation);
  }

  async function handlePageChange(event, pageNo) {
    // debugger;
    try {
      let res = await getApiData(pageNo, PAGE_SIZE);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    // setPage(res.data.currentPage);
    setPage(pageNo);
  }

  return (
    <>
      <ProjectsTable
        projectsList={projectsList.items || []}
        openDialog={openDialog}
        openDeleteConfirmation={openDeleteConfirmation}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          count={projectsList.totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ marginTop: "1rem" }}
        />
      </div>
      <ProjectsModal
        open={open}
        onClose={handleClose}
        addToProjectList={addToProjectList}
        isEditing={isEditing}
        currentIndex={currentIndex}
        projectsList={projectsList.items || []}
        // clientsList={clientsList}
        clientsList={temp}
        updateProjectsList={updateProjectsList}
      />
      <DeleteModal
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false);
        }}
        removeProject={removeProject}
        delId={delId}
      />
    </>
  );
};

export default ProjectsPage;
