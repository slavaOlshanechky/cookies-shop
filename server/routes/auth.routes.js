const express = require('express');
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const constants = require("../utils/constants");
const router = express.Router({mergeParams: true})
const SALT_ROUNDS = constants.BCRYPT_SALT_ROUNDS
const {generateDefaultUserData} = require('../utils/helpers.js')

const signUpValidators = [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password length >= 8').isLength({
        min: 8
    })
];
router.post('/signUp', [
    ...signUpValidators,
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: 'INVALID_DATA',
                        code: 400
                    }
                })
            }

            const {email, password} = req.body

            const userExists = await User.findOne({email})
            if (userExists) {
                return res
                    .status(400)
                    .json({error: {message: 'EMAIL_EXISTS', status: 400}})
            }

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

            const newUser = await User.create({
                ...req.body,
                ...generateDefaultUserData(),
                password: hashedPassword
            })

        } catch (e) {

        }
    }
])