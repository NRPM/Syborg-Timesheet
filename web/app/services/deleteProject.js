import axios from "axios";

const deleteProject = async (id) => {
  let res = axios.post(
    `http://localhost:5001/project/deleteProject/${id}`,
    undefined
  );

  return res;
};

export default deleteProject;
