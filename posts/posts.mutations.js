import client from "../client";

export default {
    Mutation: {
        uploadPost: (_, { title, content, tag, writer }, { req }) => {
            try {
                if (!req.session.user || !req.session.user.perm ) {
                    throw Error("Not allowed");
                }
                return client.post.create({
                    data : {
                        title,
                        content,
                        tag,
                        writer
                    }
                });
            } catch (error) {
                return error;
            }
        },
        deletePost: (_, { id }, { req }) => {
            try {
                if (!req.session.user || !req.session.user.perm) {
                    throw Error("Not allowed");
                }
                return client.post.delete({
                    where: { id }
                });
            } catch (error) {
                return error;
            }
            
    }
    }
}