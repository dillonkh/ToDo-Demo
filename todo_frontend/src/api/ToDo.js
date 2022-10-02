import axios from 'axios';

export const getToDos = async () => {
  const config = {
    headers: {
      'X-CSRFToken': 'YAMgwacCLyrVP7xzxqDHBusBwCwuQh92',
      Authorization: 'Basic ZGlsbG9ua2g6SG9uZGllTGFuZDk2',
    },
  };

  const response = await axios.get('http://127.0.0.1:8000/todo-items/', config);
  return response.data.results;
};

export const addToDo = async (body) => {
  const config = {
    headers: {
      'X-CSRFToken': 'YAMgwacCLyrVP7xzxqDHBusBwCwuQh92',
      Authorization: 'Basic ZGlsbG9ua2g6SG9uZGllTGFuZDk2',
    },
  };

  const response = await axios.post(
    'http://127.0.0.1:8000/todo-items/',
    body,
    config
  );
  return response.data.results;
};

export const updateToDo = async (url, body) => {
  const config = {
    headers: {
      'X-CSRFToken': 'YAMgwacCLyrVP7xzxqDHBusBwCwuQh92',
      Authorization: 'Basic ZGlsbG9ua2g6SG9uZGllTGFuZDk2',
    },
  };

  const response = await axios.patch(url, body, config);
  return response.data;
};

export const deleteToDo = async (url) => {
  const config = {
    headers: {
      'X-CSRFToken': 'YAMgwacCLyrVP7xzxqDHBusBwCwuQh92',
      Authorization: 'Basic ZGlsbG9ua2g6SG9uZGllTGFuZDk2',
    },
  };

  const response = await axios.delete(url, config);
  return response.data;
};
