const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route    Get api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
    try {

        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/', [ auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
    
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Destructure
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Create profile object
        const profileFields = {
            user: req.user.id,
            company: company,
            location: location,
            website: website,
            bio: bio,
            status: status,
            githubusername: githubusername,
            skills: Array.isArray(skills) ? skills : skills.split(',').map((skill) => skill.trim())
        };

        // Create social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube  = youtube;
        if (twitter) profileFields.social.twitter  = twitter;
        if (facebook) profileFields.social.facebook  = facebook;
        if (linkedin) profileFields.social.linkedin  = linkedin;
        if (instagram) profileFields.social.instagram  = instagram;
        
        try { 
            // Using upsert option (creates new doc if no match is found):
            let profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true, upsert: true })
            return res.json(profile);
            
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


// @route    GET api/profile
// @desc     Get all profiles
// @access   Private
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})


// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Private
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if(!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
})


// @route    DELETE api/profile
// @desc     Delete profile, user and posts
// @access   Private
router.delete('/', auth, async (req, res) => {
    try {
        //@todo - remove users posts

        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });

        // remove user
        await User.findByIdAndRemove({ _id: req.user.id }); // _id property is from mongoDB generated default id
        res.json({ msg: 'User deleted' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})
module.exports = router;