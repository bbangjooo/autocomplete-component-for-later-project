require('dotenv').config();
import crypto from "crypto";

export function loginRequiredResolver(resolver) {
    return function (root, args, context, info) {
        if (!context.req.session.user || !context.req.session.user.perm) {
            return {
                success: false,
                error: "Login Required"
            };
        }
        return resolver(root, args, context, info);
    }
}

export function encryptPassword(password) {
    return crypto
    .createHash('sha256')
    .update(password + process.env.SECRET)
    .digest('hex');
}