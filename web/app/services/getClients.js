import axios from "axios";

const getClients = async () => {
  let res = await axios.get("http://localhost:5001/client/getClients");

  return res;
};

export default getClients;
