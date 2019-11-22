const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


// GET api users, 
// Create a Post, 
// private access //
router.post('/', [
    auth,
    [
        check('text', 'Comment is required')
            .not()
            .isEmpty()
    ]
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                avatar: user.avatar,
                name: user.name,
                user: req.user.id
            });

            const post = await newPost.save();

            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Busted')
        }


    }

);

// GET api/posts , 
// GET all posts, 
// private access //

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Busted');
    }
});

// GET api/posts/:id , 
// GET post by id, 
// private access //

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Busted');
    }
});

// DELETE api/posts/:ID , 
// DELETE a post, 
// private access //

router.delete('/:id', auth, async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        //Check user //
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

        await post.remove();

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
    }
});

// PUT api/posts/:ID , 
// Like a post, 
// private access //
roiuter.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // check it post has already been checked //
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            res.status(400).json({ msg: 'Already Liked' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Busted')
    }
});

// POST api/posts/unlike/:ID , 
// Like a post, 
// private access //
roiuter.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // check it post has already been checked //
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            res.status(400).json({ msg: 'Not Yet Liked' });
        }

        const removeIndex = post.likes.map(like => like.usertoString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Busted')
    }
});

// POST api/posts/comment/:id 
// Comment on a Post, 
// private access //
router.post('/comments/:id', [
    auth,
    [
        check('text', 'Comment is required')
            .not()
            .isEmpty()
    ]
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                avatar: user.avatar,
                name: user.name,
                user: req.user.id
            });

            const post = await newPost.save();

            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Busted')
        }


    }

);

module.exports = router;