import axios from "axios";

const getProjects = async () => {
  let res = await axios.get("http://localhost:5001/project/getprojects");

  return res;
};

export default getProjects;
