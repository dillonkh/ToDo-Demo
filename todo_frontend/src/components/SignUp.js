import { useEffect, useState } from 'react';
import { Card, TextField, Box, Typography, Button, Link } from '@mui/material';

const SignUp = (props) => {
  // const [toDoList, setToDoList] = useState([]);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  // const [selectedToDo, setSelectedToDo] = useState({});

  useEffect(() => {}, []);

  return (
    <>
      <Card sx={{ maxWidth: 500, mx: 'auto', mt: 8 }}>
        <Box m={5}>
          <Typography variant='h4' sx={{ mb: 2 }}>
            ToDo Demo
          </Typography>
          <TextField
            // margin='dense'
            id='username'
            label='Username'
            type='text'
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            id='password'
            label='Password'
            type='password'
            fullWidth
            sx={{ mb: 3 }}
          />
          <Box fullWidth sx={{ display: 'flex' }}>
            <Button sx={{ ml: 'auto' }}>Sign Up</Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default SignUp;
