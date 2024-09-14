const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Define the User schema with unique constraints
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    mobile: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});

const Users = mongoose.model('Users', userSchema);

// Handler to check username availability
module.exports.checkUsernameAvailability = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await Users.findOne({ username });
        if (user) {
            return res.send({ userExists: true });
        }
        res.send({ userExists: false });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
};

module.exports.likeProducts = (req, res) => {
    const { productId, userId } = req.body;

    Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => res.send({ message: 'Liked success.' }))
        .catch(() => res.status(500).send({ message: 'Server error' }));
};

module.exports.signup = async (req, res) => {
    const { username, password, email, mobile } = req.body;

    // Validate email
    if (!email.endsWith('@bmsit.in')) {
        return res.status(400).send({ message: 'Email must end with @bmsit.in' });
    }

    try {
        // Check if username or email already exists
        const existingUser = await Users.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).send({ message: 'Username or email already registered' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Users({ username, password: hashedPassword, email, mobile });
        await user.save();
        res.send({ message: 'Signup successful.' });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
};

module.exports.myProfileById = (req, res) => {
    const uid = req.params.userId;

    Users.findOne({ _id: uid })
        .then((result) => {
            if (result) {
                res.send({
                    message: 'Success.',
                    user: {
                        email: result.email,
                        mobile: result.mobile,
                        username: result.username
                    }
                });
            } else {
                res.status(404).send({ message: 'User not found.' });
            }
        })
        .catch(() => res.status(500).send({ message: 'Server error' }));
};

module.exports.getUserById = (req, res) => {
    const _userId = req.params.uId;

    Users.findOne({ _id: _userId })
        .then((result) => {
            if (result) {
                res.send({
                    message: 'Success.',
                    user: {
                        email: result.email,
                        mobile: result.mobile,
                        username: result.username
                    }
                });
            } else {
                res.status(404).send({ message: 'User not found.' });
            }
        })
        .catch(() => res.status(500).send({ message: 'Server error' }));
};

module.exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Users.findOne({ username });
        if (!user) {
            return res.status(400).send({ message: 'User not found.' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Incorrect password.' });
        }

        const token = jwt.sign({ data: user }, 'MYKEY', { expiresIn: '1h' });
        res.send({ message: 'Login successful.', token, userId: user._id });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
};

module.exports.likedProducts = (req, res) => {
    Users.findOne({ _id: req.body.userId }).populate('likedProducts')
        .then((result) => {
            if (result) {
                res.send({ message: 'Success', products: result.likedProducts });
            } else {
                res.status(404).send({ message: 'User not found.' });
            }
        })
        .catch(() => res.status(500).send({ message: 'Server error' }));
};
