import axios from 'axios';

const BAD_REQUEST = 'ERR_BAD_REQUEST';
const TODO_URL = 'http://127.0.0.1:8000/todo-items/';

export const getToDos = async (basic_auth) => {
  const config = {
    headers: {
      Authorization: `Basic ${basic_auth}`,
    },
  };

  try {
    const response = await axios.get(TODO_URL, config);
    return response.data.results;
  } catch (e) {
    if (e.code === BAD_REQUEST) {
      handleLoginRedirect();
    }
  }
};

export const addToDo = async (basic_auth, body) => {
  const config = {
    headers: {
      Authorization: `Basic ${basic_auth}`,
    },
  };

  try {
    const response = await axios.post(TODO_URL, body, config);
    return response.data.results;
  } catch (e) {
    if (e.code === 'ERR_BAD_REQUEST') {
      handleLoginRedirect();
    }
  }
};

export const updateToDo = async (basic_auth, url, body) => {
  const config = {
    headers: {
      Authorization: `Basic ${basic_auth}`,
    },
  };
  try {
    const response = await axios.patch(url, body, config);
    return response.data;
  } catch (e) {
    if (e.code === 'ERR_BAD_REQUEST') {
      handleLoginRedirect();
    }
  }
};

export const deleteToDo = async (basic_auth, url) => {
  const config = {
    headers: {
      Authorization: `Basic ${basic_auth}`,
    },
  };
  try {
    const response = await axios.delete(url, config);
    return response.data;
  } catch (e) {
    if (e.code === 'ERR_BAD_REQUEST') {
      handleLoginRedirect();
    }
  }
};

const handleLoginRedirect = () => {
  window.location.replace('/login');
};
