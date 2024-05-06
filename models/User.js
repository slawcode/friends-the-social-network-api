// Import required dependencies from monogoose library
const { Schema, model} = require('moongoose');

// User schema 
const user Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            uniqure: true,
            trim: true,
        }
        email: {
            type: String,
            required: true,
            unique: true,
            match: [],
        }
    }
)