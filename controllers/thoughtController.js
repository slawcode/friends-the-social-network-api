const { User, Thought } = require('../models');
// const { Types } = require('mongoose');

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


// Create a reaction for a thought
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id:req.params.thoughtId },
        { $addToSet: { reactions: req.body }},
        { runValidators: true, new: true }
      );
      thought ? res.json(thought) : res.status(404).json({ message: 'No thought found!' });
    } catch (e) {
        res.status(500).json(err);
    }
  },

  // createReaction(req, res) {
  //   Thought.findOneAndUpdate(
  //     { _id: req.params.thoughtId },
  //     { $addToSet: { reactions: req.body } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((thought) =>
  //       !thought
  //         ? res.status(404).json({ message: "No thought with this ID!" })
  //         : res.json(thought)
  //     )
  //     .catch((err) => res.status(500).json(err));
  //   }    

  // Remove a reaction from a thought
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: {reactions: {reactionId: req.params.reactionId }}},
          { runValidators: true, new: true }
      );
      thought ? res.json(thought) : res.status(404).json({ message: 'No such thought exists!' });
    } catch (e) {
      res.status(500).json(e);
    }
}

// removeReaction(req, res) {
//   Thought.findOneAndUpdate(
//     { _id: req.params.thoughtId },
//     { $pull: { reactions: { reactionId: req.params.reactionId } } },
//     { runValidators: true, new: true }
//   )
//     .then((dbThoughtData) => {
//       if (!dbThoughtData) {
//         return res.status(404).json({ message: "No thought with this id!" });
//       }
//       res.json(dbThoughtData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// },

}

  //     if (!thought) {
  //     return res.status(404).json({ message: 'No such thought exists!' });
  //   }

module.exports = thoughtController;