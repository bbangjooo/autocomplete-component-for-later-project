require('dotenv').config();
import crypto from "crypto";

export function checkPassword(encrypted, password) {
    return encryptPassword(password) === encrypted;
}


export function encryptPassword(password) {
    return crypto
    .createHash('sha256')
    .update(password + process.env.SECRET)
    .digest('hex');
}