const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    status: {
        type: String,
        required: true
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
    languages: {
        type: [String]
    },
    hobbies: {
        type: [String]
    },
    profession: {
        type: String
    },
    githubusername: {
        type: String
    },
    bio: {
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
            minweight: {
                type: Number,
                required: true
            },
            maxweight: {
                type: String,
                required: true
            },
            minage: {
                type: Number,
                required: true
            },
            maxage: {
                type: Number,
                required: true
            },
            physique: {
                type: String,
                required: true
            },
            distance: {
                type: String,
                required: true
            },
            hate: {
                type: String,
                required: true
            },
            children: {
                type: String,
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
}


);



module.exports = Profile = mongoose.model('profile', ProfileSchema);