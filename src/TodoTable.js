import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button } from '@mui/material';

const TodoTable = () => {
  const [todos, setTodos] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handleCheckboxChange = (id) => {
    // Toggle selected state for the checkbox
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteClick = () => {
    // Delete selected todos from state
    const updatedTodos = todos.filter((todo) => !selectedIds.includes(todo.id));
    setTodos(updatedTodos);
    // Clear selectedIds
    setSelectedIds([]);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.id}</TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(todo.id)}
                    onChange={() => handleCheckboxChange(todo.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedIds.length > 0 && (
        <Button variant="contained" color="secondary" onClick={handleDeleteClick}>
          Delete Selected
        </Button>
      )}
    </div>
  );
};

export default TodoTable;
