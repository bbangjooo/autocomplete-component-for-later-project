import client from "../client"
import encryptPassword from "../encrypt"


export default {
    Query: {
        userExist: async (_, { username }) => {
            return client.user.findFirst({
                where: {
                    username
                }
            });
        }
    }
}