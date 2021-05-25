import axios from 'axios';
//Récupération des urls depuis l'api
const getAllUrl = async () => {
  let res = await axios.get(`/api/url`);
  return res.data || [];
};

export default getAllUrl;
