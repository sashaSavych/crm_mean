const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = require('../models/user');

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({ email: req.body.email });
    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            const token = jwt.sign({
               email: candidate.email,
               userId: candidate._id
            }, keys.jwt, { expiresIn: 60 * 60 });
            res.status(200).json({ token: `Bearer ${token}` });
        } else {
            res.status(401).json({
                message: 'The password is not correct.'
            })
        }
    } else {
        res.status(404).json({
            message: 'The user with that email does not exist.'
        });
    }
};

module.exports.register =  async (req, res) => {
    const candidate = await User.findOne({ email: req.body.email });
    if (candidate) {
        // user exists -> error
        res.status(409).json({
           message: 'The user with that email exists.'
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            console.error('User has not been created!!!')
        }
    }
};
