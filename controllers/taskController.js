const { tasks } = require('../models/taskModel');

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, status, due_date } = req.body;

    // Validate required fields
    if (!title || !status || !due_date) {
      return res.status(400).json({
        success: false,
        error: 'Title, status, and due date are required'
      });
    }

    // Validate status
    const validStatuses = ['To-Do', 'In Progress', 'Done'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Status must be one of: To-Do, In Progress, Done'
      });
    }

    // Create new task with auto-incremented ID
    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
      title,
      description,
      status,
      due_date
    };

    tasks.push(newTask);

    res.status(201).json({
      success: true,
      data: newTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error creating task'
    });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching tasks'
    });
  }
};

// Get tasks by status
const getTaskByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    
    // Validate status
    const validStatuses = ['To-Do', 'In Progress', 'Done'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be one of: To-Do, In Progress, Done'
      });
    }

    const filteredTasks = tasks.filter(task => task.status === status);

    res.status(200).json({
      success: true,
      count: filteredTasks.length,
      data: filteredTasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching tasks'
    });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const taskId = parseInt(id);

    // Find task index
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    // Validate status if it's being updated
    if (updates.status) {
      const validStatuses = ['To-Do', 'In Progress', 'Done'];
      if (!validStatuses.includes(updates.status)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid status. Must be one of: To-Do, In Progress, Done'
        });
      }
    }

    // Update task
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updates,
      id: taskId // Ensure ID doesn't get overwritten
    };

    res.status(200).json({
      success: true,
      data: tasks[taskIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error updating task'
    });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskId = parseInt(id);
    
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    tasks.splice(taskIndex, 1);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error deleting task'
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskByStatus,
  updateTask,
  deleteTask
};