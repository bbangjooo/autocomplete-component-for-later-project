import client from "../client";
import { encryptPassword } from "../encrypt";
export default {
    Mutation: {
        register: async (_, { username, password, perm }) => {
            try {
                const userExist = await client.user.findFirst({
                    where: {
                        username
                    }
                });
                if (userExist) {
                    throw new Error("User already exists. :(")
                }
                const hashedPassword = encryptPassword(password);
                return client.user.create({
                    data: {
                        username,
                        password: hashedPassword,
                        perm
                    }
                });
            } catch (error) {
                return error;
            }
        },
        login: async (_, { username, password }, { req }) => {
            try {
                const hashedPassword = encryptPassword(password);
                const foundUser = await client.user.findFirst({
                    where: {
                        AND: [
                            {
                                username
                            },
                            {
                                password: hashedPassword
                            }
                        ]
                    }
                });
                if (foundUser === null) {
                    throw Error("User not found :(");
                }
                req.session.user = {
                    id: foundUser.id, 
                    username: foundUser.username, 
                    perm: foundUser.perm
                };
                return {
                    success: true,
                    token: encryptPassword(foundUser.id)
                };
            } catch (error) {
                return {
                    success: false,
                    error
                };
            }
            
            
        }     
    }
}