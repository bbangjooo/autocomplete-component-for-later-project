import client from "../client";

export default {
    Query: {
        getAllPosts: () => (client.post.findMany({
            orderBy: [
                {
                    updatedAt: 'desc'
                }
            ]
        })),
        getPost: (_,{ id }) => (client.post.findFirst({
            where: { id }
        })),
        searchPost: (_, { keyword }) => (client.post.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: keyword,
                            mode: 'insensitive',
                            
                        }
                    },
                    {
                        content: {
                            contains: keyword,
                            mode: 'insensitive'
                        }
                    }
                    
                ]
            },
            orderBy: [{
                id: 'asc'
            }]
        }))
    }
}