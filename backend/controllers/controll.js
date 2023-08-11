const { contract } = require("../contract/contract");
const viewTask = async (req, res) => {
  try {
    const data = await contract.viewTask();
    const value = data.map((task) => {
      if (task[0] != "") return task;
    });
    res.json(value);
  } catch (error) {
    console.log(error);
  }
};

const matchDate = async (date) => {
  const data = await contract.viewTask();
  for (var value of data) {
    if (value[1] === date) {
      return false;
    }
  }
  return true;
};

const createTask = async (req, res) => {
  try {
    const { date } = req.body;
    const isPossible = await matchDate(date);
    if (isPossible) {
      res.json({ message: "Yes" });
    } else {
      res.json({ message: "No" });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { date } = req.body;
    const isPossible = await matchDate(date);
    if (isPossible) {
      res.json({ message: "Yes" });
    } else {
      res.json({ message: "No" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createTask, updateTask, viewTask };
