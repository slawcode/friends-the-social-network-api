const { User, Thought } = require("../models");

module.exports = {
// Get all users 
  async getThought(req, res) {
    try Thought.find({})
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  },
// Get a single thought 
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .select("-__v")
    .then((thought) =>
    if (!thought) {
        return res.status(404).json({ message: "No thought that ID! "})
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  },
}