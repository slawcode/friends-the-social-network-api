const { User, Thought } = require("../models");
const {Types} = require('monogoose');

// module.exports = {
const thoughtController = {
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
            res.status(404).json({ message: "No thought with that ID!" });
        }

        res.json(thought);
    }   catch (err) {
        res.status(505).json(err);
    }
  },

// Create a thought
  async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
    }   catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
    }, 
  
// Delete a thought 
  async deleteThought(req, res) {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: "No thought with that ID!" });
        }
    
        await Reaction.deleteMany({ _id: { $in: thought.reactions } });
        res.json({ message: 'Thought and reaction deleted!' });
      } catch (err) {
        res.status(500).json(err);
      }
    },

// Update a thought
  async updateThought(req,res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.courseId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: "No thought with that ID!" });
        }

        res.json(thought);
    }   catch (err) {
        res.status(500).json(err);
    }
  },  
};

module.exports = thoughtController;