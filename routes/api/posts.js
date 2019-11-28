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
router.post(
    '/',
    [
        auth,
        [
            check('text', 'Text is required')
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
                avatar: user.avatar,
                text: req.body.text,
                name: user.name,
                user: req.user.id
            });

            const post = await newPost.save();

            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
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
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        //Check user //
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

        await post.remove();

        res.json(post);
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
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if post already liked
        if (
            post.likes.filter(like => like.user.toString() === req.user.id).length > 0
        ) {
            return res.status(400).json({ msg: 'Already Liked' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST api/posts/unlike/:ID , 
// Like a post, 
// private access //
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // check it post has already been checked //
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            res.status(400).json({ msg: 'Not Yet Liked' });
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

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
            const post = await Post.findById(req.params.id);


            const newComment = {
                text: req.body.text,
                avatar: user.avatar,
                name: user.name,
                user: req.user.id
            };

            post.comments.unshift(newComment);

            await post.save();

            res.json(post.comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Busted')
        }


    }

);

// DELETE api/posts/comment/:id/:comment_id
// Delete Comment, 
// private access //
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Grab comment //
        const comment = post.comments.find(
            comment => comment.id === req.params.comment_id
        );

        // verify comment exists //        
        if (!comment) {
            return res.status(404).json({ msg: 'No Comment' })
        }

        // Check user //
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Get remove index //
        const removeIndex = post.likes.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);
        await post.save();
        res.json(post.comments);

    } catch {
        console.error(err.message);
        res.status(500).send('Server Busted');
    }
});


module.exports = router;