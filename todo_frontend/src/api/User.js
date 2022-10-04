import axios from 'axios';

const USER_URL = 'http://127.0.0.1:8000/users/';

export const getUser = async (username) => {
  const response = await axios.get(`${USER_URL}find/?username=${username}`);
  return response.data;
};

export const postUser = async (body) => {
  const response = await axios.post(USER_URL, body);
  console.log(response);
  return response.data;
};
