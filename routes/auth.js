const express = require('express');
const controller = require('../controllers/auth');
const router = express.Router();
const passport = require('passport');

router.post('/login', passport.authenticate('jwt', {session: false}), controller.login);
router.post('/register', passport.authenticate('jwt', {session: false}), controller.register);

module.exports = router;
