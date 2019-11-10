const User = require('../models');
class UserControllers {

    static create(req, res, next) {
        const { email, name } = req.body;
        User.create({
            name,
            email
        })
            .then(user => {
                res.status(200).json({ status: true, ...user._doc });
            })
            .catch(next);
    }

    static findAll(req, res, next) {
        User.find({})
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ message: `User not found` });
                }
            })
            .catch(next);
    }

    static findOne(req, res, next) {
        const _id = req.params.id;
        User.findById({ _id })
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ id: _id, message: `User not found`, status: false });
                }
            })
            .catch(next);
    }

    static edit(req, res, next) {
        const _id = req.params.id;
        let data = {};
        req.body.email && (data.email = req.body.email);
        req.body.name && (data.name = req.body.name);
        User.findByIdAndUpdate(_id, data, { new: true })
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ id: _id, message: `User not found`, status: false });
                }
            })
            .catch(next);
    }

    static delete(req, res, next) {
        const _id = req.params.id;
        console.log(_id);
        User.findByIdAndDelete({ _id })
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ id: _id, message: `User not found`, status: false });
                }
            })
            .catch(next);
    }

}

module.exports = UserControllers;