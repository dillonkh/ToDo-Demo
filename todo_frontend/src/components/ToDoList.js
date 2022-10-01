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
import { getToDos, updateToDo } from '../api/ToDo';

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
    const fetchToDos = async () => {
      const tempToDoList = await getToDos();
      setToDoList(tempToDoList);
    };
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

  const getDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getDay() > 10 ? date.getMonth() : `0${date.getMonth()}`;
    const day = date.getDay() > 10 ? date.getDay() : `0${date.getDay()}`;

    return `${year}-${month}-${day}`;
  };

  const update = (todo) => {
    const updatedToDos = updateToDo(todo);
    setToDoList(updatedToDos);
    setIsDialogOpen(false);
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
          <Button onClick={() => update(selectedToDo)}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ToDoList;
