const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

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


// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // errors: errors.array() - is the 2nd parameter in check method above
    }

    const { email, password } = req.body;
   
    try {
        let user = await User.findOne({ email: email });
        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }]});
        }

        // compare plain password from req.body to hash password from user.password(model)
        const isMatch =  await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }]});
        }

        const payload = {
            user: {
                id: user.id   // user.id is from User model
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000000 }, (err, token) => {  // 3rd parameter is callback function to get the token
            if(err) throw err;
            res.json({ token })  // send the jwt token to json
        });

    } catch (error) {
        console.error(error.message);
        res.send('Server Error');
    }
})

module.exports = router;