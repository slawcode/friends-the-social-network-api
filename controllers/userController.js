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
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    }
