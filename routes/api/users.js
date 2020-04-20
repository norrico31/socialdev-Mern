const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route    POST api/users
// @desc     register route
// @access   Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // errors: errors.array() - is the 2nd parameter in check method above
    }

    const { name, email, password } = req.body;
   
    try {

        let user = await User.findOne({ email: email });
        if(user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }]});
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        // new instance
        user = new User({
            name,
            email,
            avatar,
            password
        })

        // Encrypt password using bcryptjs
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt); // 1st parameter is you want to hash. 2nd parameter is to make it hash

        await user.save();

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