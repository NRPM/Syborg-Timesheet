import axios from "axios";

const getProjectById = async (id) => {
  let res = await axios.get(`http://localhost:5001/project/getProjectById/`);

  return res;
};

export default getProjectById;
