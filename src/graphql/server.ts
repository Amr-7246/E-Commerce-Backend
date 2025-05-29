import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { schema } from './schema'

export const setupGraphQLServer = async (app: any) => {
    const server = new ApolloServer({ schema })
    await server.start()

    app.use('/graphql', expressMiddleware(server))
}
