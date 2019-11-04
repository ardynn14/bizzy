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

}

module.exports = UserControllers;