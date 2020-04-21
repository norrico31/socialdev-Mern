const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');


// @route    Post api/posts
// @desc     Create a post
// @access   Private
router.post('/', [ auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password'); // req.user.id is from auth that verified the token

        // Instantiate of User model
        const newPost = new Post({
            user: req.user.id,
            name: user.name,
            avatar: user.avatar,
            text: req.body.text      
        });

        const post = await newPost.save();
        res.json(post);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;