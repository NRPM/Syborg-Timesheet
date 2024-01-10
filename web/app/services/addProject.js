import axios from "axios";

const addProject = async (val) => {
  let res = axios.post("http://localhost:5001/project/addproject", val);
  return res;
};

export default addProject;
