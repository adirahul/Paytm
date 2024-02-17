const bcrypt = require("bcrypt")

async function hashPassword(password){

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.log(error)
        return error;
    }
}
async function comparePassword(password, hashedPassword){
    try {
        const flag = await bcrypt.compare(password, hashedPassword)
        return flag;
    } catch (e) {
        console.log(e)
        return e;
    }
}
module.exports = {
    hashPassword,
    comparePassword
}