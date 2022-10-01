import { useEffect, useState } from 'react';
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

const ToDoList = (props) => {
  const [toDoList, setToDoList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState({});

  const statusMapList = [
    { label: 'In Progress', color: 'warning', value: 'IP' },
    { label: 'Complete', color: 'success', value: 'C' },
    { label: 'To Do', color: 'default', value: 'TD' },
    { label: 'Past Due', color: 'error', value: 'PD' },
  ];

  useEffect(() => {
    const tempToDoList = [
      {
        url: 'http://127.0.0.1:8000/todo-items/3/',
        status: 'C',
        description: 'this is new 1',
        todo_by: '2022-10-01T16:29:31.355740Z',
        completed_at: '2022-10-01T16:29:31.355740Z',
        created_ts: '2022-10-01T16:29:31.355740Z',
        updated_ts: '2022-10-01T18:08:53.039558Z',
        user_id: 'http://127.0.0.1:8000/users/1/',
      },
      {
        url: 'http://127.0.0.1:8000/todo-items/3/',
        status: 'IP',
        description: 'this is new 2',
        todo_by: '2022-10-01T16:29:31.355740Z',
        completed_at: null,
        created_ts: '2022-10-01T16:29:31.355740Z',
        updated_ts: '2022-10-01T18:08:53.039558Z',
        user_id: 'http://127.0.0.1:8000/users/1/',
      },
      {
        url: 'http://127.0.0.1:8000/todo-items/3/',
        status: 'PD',
        description: 'this is new 3',
        todo_by: '2022-10-01T16:29:31.355740Z',
        completed_at: null,
        created_ts: '2022-10-01T16:29:31.355740Z',
        updated_ts: '2022-10-01T18:08:53.039558Z',
        user_id: 'http://127.0.0.1:8000/users/1/',
      },
      {
        url: 'http://127.0.0.1:8000/todo-items/3/',
        status: 'TD',
        description: 'this is new 4',
        todo_by: '2022-10-01T16:29:31.355740Z',
        completed_at: null,
        created_ts: '2022-10-01T16:29:31.355740Z',
        updated_ts: '2022-10-01T18:08:53.039558Z',
        user_id: 'http://127.0.0.1:8000/users/1/',
      },
    ];
    setToDoList(tempToDoList);
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

  const getDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getDay() > 10 ? date.getMonth() : `0${date.getMonth()}`;
    const day = date.getDay() > 10 ? date.getDay() : `0${date.getDay()}`;

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align='right'>Goal Date</TableCell>
              <TableCell align='right'>Completed Date</TableCell>
              <TableCell align='right'>Status</TableCell>
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
                  {getFormattedDateString(todo.todo_by)}
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
          <Button onClick={() => setIsDialogOpen(false)}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ToDoList;
