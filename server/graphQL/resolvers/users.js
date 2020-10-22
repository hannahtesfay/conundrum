const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validateRegisterInput, validateLoginInput } = require('../../utilities/validators') 
const { SECRET_KEY } = require('../../config')
const User = require('../../models/User');
const { UserInputError } = require('apollo-server')

function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h'});
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const {errors, valid} = validateLoginInput(username, password);

            if(!valid){
                throw new UserInputError('Errors', { errors })
            }

            const user = await User.findOne({ username });

            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = 'Incorrect login details';
                throw new UserInputError('Incorrect login details', { errors })
            }

            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            };
        },
        async register(_, 
            { 
                registerInput : { username, email, password, confirmPassword }
            }) {
                
                // validate user data (server side - unique user names etc)
                const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
                if(!valid){
                    throw new UserInputError('Errors', { errors }); // { errors } is a payload
                }

                // make sure user doesn't already exist
                const user = await User.findOne({ username });
                if(user){
                    throw new UserInputError('Username is taken', {
                        // passing payload, it'll have error as lient?
                        errors: {
                            username: 'This username is taken'
                        }
                    })
                }

                password = await bcrypt.hash(password, 12);

                const newUser = new User({
                    email,
                    username,
                    password,
                    createdAt: new Date().toISOString()
                });

                const res = await newUser.save();

                //  hash pw and create an auth token
                const token = generateToken(res)

                return {
                    ...res._doc,
                    id: res._id,
                    token
                };
            }

    }
}

// bcrypt functionality is asynchronous so we had to add async