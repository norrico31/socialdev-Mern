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

        // Instantiate of Post model
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


// @route    Get api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }); // sort by date which will do the most recent/updated post
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');    
    }
})


// @route    Get api/posts/:id
// @desc     Get post by user id
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id); 
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');    
    }
})


// @route    DELETE api/posts/:id
// @desc     Delete post by user id
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id); 
        
        if (!post) {
            return res.status(401).json({ msg: 'Unauthorized user' });
        }

        // Check user
        if (post.user.toString() !== req.user.id) { // if you don't put toString() method it will never match if it's the right user
            return res.status(401).json({ msg: 'Unauthorized user' });
        }
        await post.remove();
        res.json({ msg: 'Post deleted' });

    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');    
    }
});


// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked
        if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// @route    PUT api/posts/unlike/:id
// @desc     Like a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked
        if (post.likes.filter(({ user }) => user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }
        
        // Get remove index
        const removeIndex = post.likes.map(({ user }) => user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;