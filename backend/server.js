const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todolist');

const Task = mongoose.model('Task', {
  title: String,
  completed: Boolean,
  assignedTo: String,
  status: String,
  dueDate: Date,
  priority: String
});

app.get('/api/tasks', async (req, res) => res.json(await Task.find()));
app.post('/api/task', async (req, res) => res.json(await Task.create(req.body)));
app.put('/api/task/:id', async (req, res) =>
  res.json(await Task.findByIdAndUpdate(req.params.id, req.body))
);
app.delete('/api/task/:id', async (req, res) =>
  res.json(await Task.findByIdAndDelete(req.params.id))
);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
