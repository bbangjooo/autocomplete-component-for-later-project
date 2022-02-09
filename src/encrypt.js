require('dotenv').config();
import crypto from "crypto";

export default function encryptPassword(password) {
    return crypto
    .createHash('sha256')
    .update(password + process.env.SECRET)
    .digest('hex');
}