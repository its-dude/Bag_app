const bcrypt = require('bcrypt');

const encPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);  // Synchronous salt generation
    const hashedPassword = bcrypt.hashSync(password, salt);  // Synchronous hashing
    return hashedPassword;
}

module.exports = encPassword;
