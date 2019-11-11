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
        let checkFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const _id = req.params.id;
        let data = {};
        req.body.email && (data.email = req.body.email);
        req.body.name && (data.name = req.body.name);
        if (checkFormat.test(data.email)) {
            User.findOne({ email: data.email })
                .then(user => {
                    if (user) {
                        if (user._id == _id) {
                            return User.findByIdAndUpdate(_id, data, { new: true })
                        } else {
                            res.status(409).json({ email: data.email, message: `Email has already been used`, status: false });
                        }
                    } else {
                        res.status(404).json({ id: _id, message: `User not found`, status: false });
                    }
                })
                .then(user => {
                    if (user) {
                        res.status(200).json({ status: true, ...user._doc });
                    } else {
                        res.status(404).json({ id: _id, message: `User not found`, status: false });
                    }
                })
                .catch(next);
        } else {
            res.status(400).json({ email: data.email, message: `Is Invalid`, status: false });
        }
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