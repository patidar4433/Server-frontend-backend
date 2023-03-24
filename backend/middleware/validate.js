const dotenv = require('dotenv');
dotenv.config();
const validate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if(token){
            if(token === process.env.token){
                console.log('Token ', token);
                next();
            }else{
                res.send({ message: 'Invalid token', status: 0});
            }
        }else{
            res.send({ message: 'No token provided', status: 0});
        }
    } catch (error) {
        console.log('Error ', error);
        throw new Error(error);
    }
}


module.exports = validate;