import { useEffect, useState } from 'react';
import {
  Button,
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { addToDo, deleteToDo, getToDos, updateToDo } from '../api/ToDo';
import {
  convertLocalToUTC,
  getFormattedDateString,
  getMaterialUIDateString,
} from '../utils/date';
import { useCookies } from 'react-cookie';

const ToDoList = (props) => {
  const [toDoList, setToDoList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState({});
  const [cookies, setCookie] = useCookies(['basic_auth']);

  const user = cookies.user;

  useEffect(() => {
    fetchToDos(cookies.basic_auth);
  }, []);

  const statusMapList = [
    { label: 'In Progress', color: 'warning', value: 'IP' },
    { label: 'Complete', color: 'success', value: 'C' },
    { label: 'To Do', color: 'default', value: 'TD' },
    { label: 'Past Due', color: 'error', value: 'PD' },
  ];

  const mapStatus = (status) => {
    const statusMap = {
      IP: { label: 'In Progress', color: 'warning', value: 'IP' },
      C: { label: 'Complete', color: 'success', value: 'C' },
      TD: { label: 'To Do', color: 'default', value: 'TD' },
      PD: { label: 'Past Due', color: 'error', value: 'PD' },
    };
    return statusMap[status];
  };

  const fetchToDos = async (basic_auth) => {
    const tempToDoList = await getToDos(basic_auth);
    setToDoList(tempToDoList);
  };

  const update = async (basic_auth, url, todo) => {
    await updateToDo(basic_auth, url, todo);
    fetchToDos(cookies.basic_auth);
    setIsDialogOpen(false);
  };

  const create = async (basic_auth, todo) => {
    await addToDo(basic_auth, todo);
    fetchToDos(cookies.basic_auth);
    setIsCreateDialogOpen(false);
  };

  const deleteItem = async (basic_auth, url) => {
    await deleteToDo(basic_auth, url);
    fetchToDos(cookies.basic_auth);
  };

  return (
    <Box marginX={5}>
      <Button
        variant='text'
        color='success'
        size='large'
        onClick={() => {
          setSelectedToDo({
            user_id: user.url,
            status: 'TD',
          });
          setIsCreateDialogOpen(true);
        }}
      >
        Add New
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align='right'>Goal Date</TableCell>
              <TableCell align='right'>Completed Date</TableCell>
              <TableCell align='right'>Status</TableCell>
              <TableCell align='right'></TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {toDoList.map((todo) => (
              <TableRow
                key={todo.description}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {todo.description}
                </TableCell>
                <TableCell align='right'>
                  {todo.todo_by ? getFormattedDateString(todo.todo_by) : ''}
                </TableCell>
                <TableCell align='right'>
                  {todo.completed_at
                    ? getFormattedDateString(todo.completed_at)
                    : ''}
                </TableCell>
                <TableCell align='right'>
                  <Chip
                    label={mapStatus(todo.status).label}
                    color={mapStatus(todo.status).color}
                    variant='outlined'
                  />
                </TableCell>
                <TableCell align='right'>
                  <Button
                    variant='text'
                    onClick={() => {
                      setSelectedToDo(todo);
                      setIsDialogOpen(true);
                    }}
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell align='right'>
                  <Button
                    variant='text'
                    color='error'
                    onClick={() => {
                      deleteItem(cookies.basic_auth, todo.url);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isDialogOpen}>
        <DialogTitle>Update ToDo</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            id='description'
            label='Description'
            type='text'
            fullWidth
            variant='standard'
            value={selectedToDo?.description}
            onChange={(e) =>
              setSelectedToDo({ ...selectedToDo, description: e.target.value })
            }
          />
          <TextField
            margin='dense'
            id='todo_by'
            label='Complete by'
            type='datetime-local'
            fullWidth
            variant='standard'
            defaultValue='2017-05-24T10:30'
            value={
              selectedToDo?.todo_by
                ? getMaterialUIDateString(selectedToDo?.todo_by)
                : ''
            }
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              setSelectedToDo({
                ...selectedToDo,
                todo_by: convertLocalToUTC(e.target.value),
              })
            }
          />
          <TextField
            margin='dense'
            id='completed_at'
            label='Date completed'
            type='datetime-local'
            fullWidth
            variant='standard'
            defaultValue='2017-05-24T10:30'
            value={
              selectedToDo?.completed_at
                ? getMaterialUIDateString(selectedToDo?.completed_at)
                : ''
            }
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              setSelectedToDo({
                ...selectedToDo,
                completed_at: convertLocalToUTC(e.target.value),
              })
            }
          />
          <Select
            id='status'
            value={selectedToDo?.status}
            label='Status'
            onChange={(e) =>
              setSelectedToDo({ ...selectedToDo, status: e.target.value })
            }
          >
            {statusMapList.map((status) => (
              <MenuItem key={status.label} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() =>
              update(cookies.basic_auth, selectedToDo.url, {
                description: selectedToDo.description,
                status: selectedToDo.status,
                completed_at: selectedToDo.completed_at,
                todo_by: selectedToDo.todo_by,
              })
            }
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isCreateDialogOpen}>
        <DialogTitle>Create ToDo</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            id='description'
            label='Description'
            type='text'
            fullWidth
            variant='standard'
            value={selectedToDo?.description}
            onChange={(e) =>
              setSelectedToDo({ ...selectedToDo, description: e.target.value })
            }
          />
          <TextField
            margin='dense'
            id='todo_by'
            label='Complete by'
            type='datetime-local'
            fullWidth
            variant='standard'
            defaultValue='2017-05-24T10:30'
            value={selectedToDo?.todo_by ? selectedToDo?.todo_by : ''}
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              setSelectedToDo({ ...selectedToDo, todo_by: e.target.value })
            }
          />
          <TextField
            margin='dense'
            id='completed_at'
            label='Date completed'
            type='datetime-local'
            fullWidth
            variant='standard'
            defaultValue='2017-05-24T10:30'
            value={selectedToDo?.completed_at ? selectedToDo?.completed_at : ''}
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              setSelectedToDo({ ...selectedToDo, completed_at: e.target.value })
            }
          />
          <Select
            id='status'
            value={selectedToDo?.status || 'TD'}
            label='Status'
            onChange={(e) =>
              setSelectedToDo({ ...selectedToDo, status: e.target.value })
            }
          >
            {statusMapList.map((status) => (
              <MenuItem key={status.label} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              create(cookies.basic_auth, selectedToDo);
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ToDoList;
