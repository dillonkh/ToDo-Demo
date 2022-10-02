import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Button,
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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { addToDo, deleteToDo, getToDos, updateToDo } from '../api/ToDo';
import { LocalizationProvider } from '@mui/x-date-pickers';

const ToDoList = (props) => {
  const [toDoList, setToDoList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState({});

  const statusMapList = [
    { label: 'In Progress', color: 'warning', value: 'IP' },
    { label: 'Complete', color: 'success', value: 'C' },
    { label: 'To Do', color: 'default', value: 'TD' },
    { label: 'Past Due', color: 'error', value: 'PD' },
  ];

  useEffect(() => {
    fetchToDos();
  }, []);

  const mapStatus = (status) => {
    const statusMap = {
      IP: { label: 'In Progress', color: 'warning', value: 'IP' },
      C: { label: 'Complete', color: 'success', value: 'C' },
      TD: { label: 'To Do', color: 'default', value: 'TD' },
      PD: { label: 'Past Due', color: 'error', value: 'PD' },
    };
    return statusMap[status];
  };

  const getFormattedDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getMaterialUIDateString = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
    const day =
      date.getDate() > 9 ? date.gegetDatetDay() : `0${date.getDate()}`;
    return `${year}-${month}-${day}`;
  };

  const convertLocalToUTC = (localDate) => {
    const date = new Date(localDate);
    const utc = date.toISOString();
    return utc;
  };

  const fetchToDos = async () => {
    const tempToDoList = await getToDos();
    setToDoList(tempToDoList);
  };

  const update = async (url, todo) => {
    await updateToDo(url, todo);
    fetchToDos();
    setIsDialogOpen(false);
  };

  const create = async (todo) => {
    await addToDo(todo);
    fetchToDos();
    setIsCreateDialogOpen(false);
  };

  const deleteItem = async (url) => {
    await deleteToDo(url);
    fetchToDos();
  };

  // const [value, setValue] = useState(dayjs('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setSelectedToDo({
      ...selectedToDo,
      completed_at: newValue,
    });
  };

  return (
    <>
      <Button
        variant='text'
        color='success'
        size='large'
        onClick={() => {
          setSelectedToDo({
            user_id: 'http://127.0.0.1:8000/users/1/',
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
                      deleteItem(todo.url);
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
            type='date'
            fullWidth
            variant='standard'
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
            type='date'
            fullWidth
            variant='standard'
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
              update(selectedToDo.url, {
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
            type='date'
            fullWidth
            variant='standard'
            value={selectedToDo?.todo_by ? getDate(selectedToDo?.todo_by) : ''}
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              setSelectedToDo({ ...selectedToDo, todo_by: e.target.value })
            }
          />
          <TextField
            margin='dense'
            id='completed_at'
            label='Date completed'
            type='date'
            fullWidth
            variant='standard'
            value={
              selectedToDo?.completed_at
                ? getDate(selectedToDo?.completed_at)
                : ''
            }
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
              create(selectedToDo);
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ToDoList;
