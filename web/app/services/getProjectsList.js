import axios from "axios";

const getApiData = async (pageNo, pageSize) => {
  let res = await axios.get(
    `http://localhost:5001/project/getprojectlist?page=${pageNo}&pageSize=${pageSize}`
  );
  return res;
};

export default getApiData;
