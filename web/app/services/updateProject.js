import axios from "axios";

const updateProject = async (id) => {
  let res = await axios.post(
    `http://localhost:5001/project/updateProject/${id}`
  );

  return res;
};

export default updateProject;
