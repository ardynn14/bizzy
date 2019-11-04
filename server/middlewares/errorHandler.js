function errorHandler(err, req, res, next) {
    // console.log(err);
    if (err.name == "ValidationError") {
        let errorStatus = 500;
        let errorMessage = '';
        let msgValidation = [];
        for (r in err.errors) {
            msgValidation.push(err.errors[r].message);
        }
        if (msgValidation[0] == 'Is invalid') {
            errorStatus = 400;
            errorMessage = msgValidation[0];
        } else if (msgValidation[0] == 'Email has already been used') {
            errorStatus = 409;
            errorMessage = msgValidation[0];
        } else {
            errorStatus = 400;
            errorMessage = msgValidation.join(', ');
        }
        res.status(errorStatus).json({
            email: err.errors.email.properties.value,
            message: errorMessage,
            status: false
        });
    } else {
        let myErr = [err.msg];
        if (Array.isArray(err.msg)) {
            myErr = err.msg;
        }
        res.status(err.statusCode || 500).json({
            message: (err.msg) ? myErr : ['Internal server error']
        });
    }
}

module.exports = errorHandler