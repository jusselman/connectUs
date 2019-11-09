const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    age: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    hobbies: {
        type: [String],
    },
    profession: {
        type: String
    },
    looking: [
        {
            interested: {
                type: String,
                required: true
            },
            gender: {
                type: String,
                required: true
            },
            age: {
                type: Number,
                required: true
            },
            hate: {
                type: [String],
                required: true
            }
        }
    ],
    socialmedia: {
        instagram: {
            type: String
        },
        snapchat: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});



module.exports = Profile = mongoose.model('profile', ProfileSchema);