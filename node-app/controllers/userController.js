const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Users = mongoose.model('Users', {
    username: String,
    mobile: String,
    email: String,
    password: String,
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});

module.exports.likeProducts = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => {
            res.send({ message: 'liked success.' });
        })
        .catch(() => {
            res.send({ message: 'server err' });
        });
};

module.exports.signup = async (req, res) => {
    const { username, password, email, mobile } = req.body;
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new Users({ username, password: hashedPassword, email, mobile });
        
        await user.save();
        res.send({ message: 'saved success.' });
    } catch (error) {
        res.send({ message: 'server err' });
    }
};

module.exports.myProfileById = (req, res) => {
    let uid = req.params.userId;

    Users.findOne({ _id: uid })
        .then((result) => {
            res.send({
                message: 'success.',
                user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username
                }
            });
        })
        .catch(() => {
            res.send({ message: 'server err' });
        });

    return;
};

module.exports.getUserById = (req, res) => {
    const _userId = req.params.uId;
    Users.findOne({ _id: _userId })
        .then((result) => {
            res.send({
                message: 'success.',
                user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username
                }
            });
        })
        .catch(() => {
            res.send({ message: 'server err' });
        });
};

module.exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Users.findOne({ username });
        if (!user) {
            return res.status(400).send({ message: 'user not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'password wrong.' });
        }

        const token = jwt.sign({ data: user }, 'MYKEY', { expiresIn: '1h' });
        res.send({ message: 'find success.', token, userId: user._id });
    } catch (error) {
        res.send({ message: 'server err' });
    }
};

module.exports.likedProducts = (req, res) => {
    Users.findOne({ _id: req.body.userId }).populate('likedProducts')
        .then((result) => {
            res.send({ message: 'success', products: result.likedProducts });
        })
        .catch((err) => {
            res.send({ message: 'server err' });
        });
};
