const ToDoModel = require('../models/ToDoModel');

module.exports.getToDo = async (req, res) => {
  const userId = req.user._id; // Assuming you have implemented user authentication middleware

  try {
    const toDo = await ToDoModel.find({ user: userId });
    res.send(toDo);
  } catch (error) {
    console.log('Error while fetching ToDo items:', error);
    res.status(500).send('An error occurred while fetching ToDo items.');
  }
};

module.exports.saveToDo = async (req, res) => {
  const { text } = req.body;
  const userId = req.user._id; // Assuming you have implemented user authentication middleware

  try {
    const todo = new ToDoModel({
      text: text,
      user: userId
    });

    const savedTodo = await todo.save();
    res.send("Added Successfully");
  } catch (error) {
    console.log('Error while saving ToDo:', error);
    res.status(500).send('An error occurred while saving ToDo.');
  }
};


module.exports.updateToDo = async (req, res) => {
  const { _id, text } = req.body;
  const userId = req.user._id; // Assuming you have implemented user authentication middleware

  try {
    const todo = await ToDoModel.findOne({ _id, user: userId });
    if (!todo) {
      return res.status(404).send('ToDo not found');
    }

    todo.text = text;
    await todo.save();

    res.send("Updated Successfully");
  } catch (error) {
    console.log('Error while updating ToDo:', error);
    res.status(500).send('An error occurred while updating ToDo.');
  }
};

module.exports.deleteToDo = async (req, res) => {
  const { _id } = req.body;
  const userId = req.user._id; // Assuming you have implemented user authentication middleware

  try {
    const todo = await ToDoModel.findOne({ _id, user: userId });
    if (!todo) {
      return res.status(404).send('ToDo not found');
    }

    const deletedTodo = await ToDoModel.findByIdAndDelete(_id);

    res.json({ message: 'Deleted successfully', data: deletedTodo });
  } catch (error) {
    console.log('Error while deleting ToDo:', error);
    res.status(500).send('An error occurred while deleting ToDo.');
  }
};
