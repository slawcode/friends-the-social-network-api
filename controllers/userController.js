const { User, Thought } = require("../models");

module.exports = {

// Get all users    
    async getAllUsers(req, res) {
        try {
            const user = await User.find();
            res.json(user);
        }   catch (err) {
            res.status(500).json(err);
        }
    },

// Get one user by ID 
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate("thoughts")
            .populate("friends")

            if (!user) {
                return res.status(404).json({ message: "No user with that ID!" });
            }

            res.json(user);
        }   catch (err) {
            res.status(500).json(err);
        }
    },

// Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        }   catch (err) {
            res.status(500).json(err);
        }
    },

// Delete a user and remove their thoughts (bonus)
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            
            if (!user) {
              return res.status(404).json({ message: "No such user exists" })
            }   
            
            const thought = await Thought.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
            );

            if (!thought) {
              return res.status(404).json({
                    messsage: "User and thoughts deleted!",
              });
            }
            
            res.json({ message: "User successfully deleted!" });
        }   catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

// Add a friend to friend list 
    async addFriend(req, res) {
        try {
            console.log("You are adding a friend!");
            console.log(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404)
                .json({ message: "No user found with that ID!" })
            }

            res.json(user);
        }   catch (err) {
            res.status(500).json(err);
        }

    },

// Remove a friend from friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friend: { friendId: req.params.friendId } } }, 
                {runValidators: true, new: true }
            );

            if (!user);
        }   catch (err) {
            res.status(500).json(err);
        }
    },
}
