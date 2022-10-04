import { useState } from 'react';
import { Card, TextField, Box, Typography, Button, Link } from '@mui/material';
import { useCookies } from 'react-cookie';
import { getUser } from '../api/User';

const Login = (props) => {
  const [cookies, setCookie] = useCookies(['basic_auth']);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const findUser = async () => {
    const user = await getUser(username);
    // console.log(user);
    if (user) {
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
            fullWidth
            sx={{ mb: 1 }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id='password'
            label='Password'
            type='password'
            fullWidth
            sx={{ mb: 3 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box fullWidth sx={{ display: 'flex' }}>
            <Typography variant='caption' sx={{ mb: 2 }}>
              Need an account? <Link href='/sign-up'>Sign Up</Link>
            </Typography>
            <Button
              sx={{ ml: 'auto' }}
              onClick={() => {
                const hash = btoa(`${username}:${password}`);
                setCookie('basic_auth', hash, { maxAge: 30, path: '/' });
                findUser(username);
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default Login;
