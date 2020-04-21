const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route    Get api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, async (req, res) => {
    try {
        // req.user is from auth that verified the token
        const user= await User.findById(req.user.id).select('-password'); // use select method to choose what you want and you dont want to include
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;