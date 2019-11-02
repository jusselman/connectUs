const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    interested: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    hobbies: {
        type: String,
    },
    profession: {
        type: String
    },
});