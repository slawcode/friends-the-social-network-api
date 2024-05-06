// Import required dependencies from Monogoose library
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
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
        }
    }
)