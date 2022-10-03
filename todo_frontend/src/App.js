import ToDoList from './components/ToDoList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Box className='App' height={'100vh'} width={'100vw'}>
      <header className='App-header'>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ToDoList />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
