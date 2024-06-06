// Import required dependencies from Monogoose library
const { Schema, model } = require('mongoose');

// User schema 
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            uniqure: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email address."], // Email validation with regular expression
        },
        thoughts: [ 
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual 'friendCount' to retrieve the length of the user's friends / Number of friends
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

// Create User model using the userSchema
const User = model('User', userSchema)

// Export the User model
module.exports = User; 