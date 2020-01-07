const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// GET api/profile/me  // Get current user profile // private access //
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
            .populate(
                'user',
                ['name', 'avatar']
            );

        if (!profile) {
            return res.status(400).json({ msg: 'No profile for user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST api/profile  
// Create or update user profile 
// private access //
router.post('/',
    [
        auth,
        [
            check('age', 'Age is required')
                .not()
                .isEmpty(),
            check('height', 'Height is required')
                .not()
                .isEmpty(),
            check('gender', 'Gender is required')
                .not()
                .isEmpty(),
            check('location', 'Location is required')
                .not()
                .isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            company,
            age,
            height,
            gender,
            status,
            location,
            website,
            bio,
            languages,
            hobbies,
            githubusername,
            profession,
            instagram,
            snapchat,
            facebook,
            linkedin
        } = req.body;

        // Build profile object //
        const profileFields = {};
        profileFields.user = req.user.id;
        if (age) profileFields.age = age;
        if (height) profileFields.height = height;
        if (gender) profileFields.gender = gender;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (languages) profileFields.languages = languages;
        if (website) profileFields.website = website;
        if (age) profileFields.age = age;
        if (company) profileFields.company = company;
        if (location) profileFields.location = location;
        if (profession) profileFields.profession = profession;
        if (githubusername) profileFields.githubusername = githubusername;
        if (hobbies) {

            // console.log(123)
            // profileFields.hobbies = hobbies.split(',').map(look => look.trim());
        }

        profileFields.socialmedia = {};
        if (instagram) profileFields.socialmedia.instagram = instagram;
        if (snapchat) profileFields.socialmedia.snapchat = snapchat;
        if (facebook) profileFields.socialmedia.facebook = facebook;
        if (linkedin) profileFields.socialmedia.linkedin = linkedin;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                //update profile //
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );
                return res.json(profile);
            }
            // create profile //
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.statusMessage(500).send('Server Error')
        }
    }
);

// edit profile //
router.put('/',
    [
        auth,
        [
            check('age', 'Age is required')
                .not()
                .isEmpty(),
            check('height', 'Height is required')
                .not()
                .isEmpty(),
            check('gender', 'Gender is required')
                .not()
                .isEmpty(),
            check('location', 'Location is required')
                .not()
                .isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            company,
            age,
            height,
            gender,
            status,
            location,
            website,
            bio,
            languages,
            hobbies,
            githubusername,
            profession,
            instagram,
            snapchat,
            facebook,
            linkedin
        } = req.body;

        // Build profile object //
        const profileFields = {};
        profileFields.user = req.user.id;
        if (age) profileFields.age = age;
        if (height) profileFields.height = height;
        if (gender) profileFields.gender = gender;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (languages) profileFields.languages = languages;
        if (website) profileFields.website = website;
        if (age) profileFields.age = age;
        if (company) profileFields.company = company;
        if (location) profileFields.location = location;
        if (profession) profileFields.profession = profession;
        if (githubusername) profileFields.githubusername = githubusername;
        if (hobbies) {

            // console.log(123)
            // profileFields.hobbies = hobbies.split(',').map(look => look.trim());
        }

        profileFields.socialmedia = {};
        if (instagram) profileFields.socialmedia.instagram = instagram;
        if (snapchat) profileFields.socialmedia.snapchat = snapchat;
        if (facebook) profileFields.socialmedia.facebook = facebook;
        if (linkedin) profileFields.socialmedia.linkedin = linkedin;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                //update profile //
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );
                return res.json(profile);
            }
            // create profile //
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.statusMessage(500).send('Server Error')
        }
    }
);


// route    GET api/profiles //
// desc     get all profiles //
// access   Public //
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// route    GET api/profile/user/:user_id //
// desc     get profile by user id //
// access   Public //
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// route    DELETE api/profile //
// desc     Delete profile, user  & posts //
// access   Privado //

router.delete('/', auth, async (req, res) => {
    try {
        // Remove users' posts //
        // Remove profile //
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// route    PUT api/profile/looking //
// desc     Add profile looking //
// access   Privado //
router.put(
    '/looking',
    [
        auth,
        [
            check('interested', 'Interested In is required')
                .not()
                .isEmpty(),
            check('gender', 'Gender is required')
                .not()
                .isEmpty(),
            check('age', 'Age is required')
                .not()
                .isEmpty(),
            check('hate', 'Hate is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            interested,
            gender,
            age,
            hate
        } = req.body;

        const newLook = {
            interested,
            gender,
            age,
            hate
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.looking.unshift(newLook);
            await profile.save();

            // const newLocal = res.json(profile);
            // console.log(newLocal);

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Busted');
        }
    }
);


// @route     DELETE api/profile/looking/:look_id
// @descri    Delete looking from profile
// @access    Private

router.delete('/looking/:look_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Get remove index //
        const removeIndex = profile.looking.map(items => items.id)
            .indexOf(req.params.look_id);

        profile.looking.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Busted');
    }
})


// @route     GET api/profile/github/:username
// @descri    Get repos from Github
// @access    Public
router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            methos: 'GET',
            headers: { 'user-agent': 'node.js' }
        };

        request(options, (error, response, body) => {
            if (error) console.error(error);

            if (response.status !== 200) {
                return res.status(404).json({ msg: 'Github not Found' });
            }
        });

    } catch (err) {
        console.err(err.message);
        res.status(500).send('Server Error');
    }

    res.json(JSON.parse(body));
})



module.exports = router;