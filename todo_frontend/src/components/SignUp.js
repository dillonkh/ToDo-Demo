import { useEffect, useState } from 'react';
import { Card, TextField, Box, Typography, Button } from '@mui/material';
import { useCookies } from 'react-cookie';
import { postUser } from '../api/User';

const SignUp = (props) => {
  const [cookies, setCookie] = useCookies(['basic_auth']);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');

  useEffect(() => {}, []);

  const signUp = async () => {
    const user = await postUser({
      username,
      password,
      email,
      first_name: fName,
      last_name: lName,
    });
    if (user) {
      const hash = btoa(`${username}:${password}`);
      setCookie('basic_auth', hash, { maxAge: 30, path: '/' });
      setCookie('user', user, { maxAge: 3600, path: '/' });
      window.location.replace('/');
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 500, mx: 'auto', mt: 8 }}>
        <Box m={5}>
          <Typography variant='h4' sx={{ mb: 2 }}>
            ToDo Demo
          </Typography>
          <TextField
            id='username'
            label='Username'
            type='text'
            value={username}
            fullWidth
            sx={{ mb: 1 }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id='password'
            label='Password'
            type='password'
            value={password}
            fullWidth
            sx={{ mb: 1 }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id='email'
            label='email'
            type='email'
            value={email}
            fullWidth
            sx={{ mb: 1 }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id='fname'
            label='First Name'
            type='text'
            value={fName}
            fullWidth
            sx={{ mb: 1 }}
            onChange={(e) => setFName(e.target.value)}
          />
          <TextField
            id='lname'
            label='Last Name'
            type='text'
            value={lName}
            fullWidth
            sx={{ mb: 3 }}
            onChange={(e) => setLName(e.target.value)}
          />
          <Box fullWidth sx={{ display: 'flex' }}>
            <Button
              sx={{ ml: 'auto' }}
              onClick={() => {
                signUp();
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default SignUp;
