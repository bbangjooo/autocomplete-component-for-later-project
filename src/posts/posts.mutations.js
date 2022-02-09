import client from "../client";

export default {
    Mutation: {
        uploadPost: async (_, { title, content, tag, writer }, { req }) => {
            try {
                if (!req.session.user || !req.session.user.perm ) {
                    throw Error("Not allowed");
                }
                const newPost = await client.post.create({
                    data : {
                        title,
                        content,
                        tag,
                        writer
                    }
                });
                return {
                    success: true,
                    id: newPost.id
                }
            } catch (error) {
                return {
                    success: false,
                    error
                }
            }
        },
        deletePost: async (_, { id }, { req }) => {
            try {
                if (!req.session.user || !req.session.user.perm) {
                    throw Error("Not allowed");
                }
                const deletedPost = await client.post.delete({
                    where: { id }
                });
                return {
                    success: true,
                    id: deletedPost.id
                };
            } catch (error) {
                return {
                    success: false,
                    error
                }
            }
            
    }
    }
}