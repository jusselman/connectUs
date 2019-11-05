const express = require('express');
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

// POST api/profile  // Create or update user profile // private access //
router.post('/',
    [
        auth,
        [
            check('height', 'Height is required')
                .not()
                .isEmpty(),
            check('location', 'Location is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            height,
            location,
            hobbies,
            profession,
            // looking,
            instagram,
            snapchat,
            facebook,
            linkedin
        } = req.body;

        // Build profile object //
        const profileFields = {};
        profileFields.user = req.user.id;
        if (height) profileFields.height = height;
        if (location) profileFields.location = location;
        if (profession) profileFields.profession = profession;
        if (hobbies) {

            // console.log(123)
            profileFields.hobbies = hobbies.split(',').map(look => look.trim());
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


module.exports = router;