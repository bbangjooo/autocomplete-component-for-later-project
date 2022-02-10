import client from "../client"


export default {
    Query: {
        userExist: async (_, { username }) => {
            return client.user.findFirst({
                where: {
                    username
                }
            });
        },
        getUser: async (_, { id }) => {
            try {
                const { id, username, perm } = await client.user.findFirst({
                    where: {
                        id
                    }
                });
                return { id, username, perm };
            } catch {
                return null;
            }
            

        }
    }
}