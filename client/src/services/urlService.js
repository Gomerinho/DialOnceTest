import axios from 'axios';

const getAllUrl = async () => {
  let res = await axios.get(`/api/url`);
  console.log(res.data);
  return res.data || [];
};

export default getAllUrl;
