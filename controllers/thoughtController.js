const { User, Thought } = require("../models");

module.exports = {
// Get all users 
  async getAllThoughts(req, res) {
    try { 
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
  },
// Get a single thought 
  async getSingleThought(req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(404).json({ message: "No thoguth with that ID!" });
        }

        res.json(thought);
    }   catch (err) {
        res.status(505).json(err);
    }
  },
//Create a thought
  async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
    }   catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
    }, 
  }
