const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, `Name cannot be empty`]
    },
    email: {
        type: String,
        required: [true, `Email cannot be empty`],
        validate: [{
            validator: function emailFormat(email) {
                let checkFormat = /\S+@\S+\.\S+/;
                return checkFormat.test(email);
            },
            message: props => `Is invalid`
        }, {
            validator: function emailUnique(email) {
                return User.findOne({ email: this.email })
                    .then(function (user) {
                        if (user) {
                            return false;
                        } else {
                            return true;
                        }
                    })
                    .catch(function (err) {
                        return false;
                    })
            },
            message: props => `Email has already been used`
        }]
    }
}, {
    versionKey: false
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
