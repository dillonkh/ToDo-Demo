// import { tempToDoList } from '../temp/mockToDos';
import axios from 'axios';

export const getToDos = async () => {
  let config = {
    headers: {
      'X-CSRFToken': 'YAMgwacCLyrVP7xzxqDHBusBwCwuQh92',
      Authorization: 'Basic ZGlsbG9ua2g6SG9uZGllTGFuZDk2',
      // Cookie:
      //   'csrftoken=YAMgwacCLyrVP7xzxqDHBusBwCwuQh92; sessionid=x2uet1j7any5cqwjmkmkhi5iff3eept9',
    },
  };

  const response = await axios.get('http://127.0.0.1:8000/todo-items/', config);
  console.log(response);
  return response.data.results;
};

export const updateToDo = async (todoItem) => {
  // let config = {
  //   headers: {
  //     'X-CSRFToken': 'YAMgwacCLyrVP7xzxqDHBusBwCwuQh92',
  //     Authorization: 'Basic ZGlsbG9ua2g6SG9uZGllTGFuZDk2',
  //     Cookie:
  //       'csrftoken=YAMgwacCLyrVP7xzxqDHBusBwCwuQh92; sessionid=x2uet1j7any5cqwjmkmkhi5iff3eept9',
  //   },
  // };

  // const response = await axios.get('http://127.0.0.1:8000/todo-items/', config);
  // console.log(response);
  // return response.data;
  return todoItem;
};

// export const deleteToDo = async (todoItem) => {
//   tempToDoList = { ...tempToDoList, todoItem };
//   return tempToDoList;
// };
