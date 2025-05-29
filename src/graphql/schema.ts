import { makeExecutableSchema } from '@graphql-tools/schema'
import { userTypeDefs } from '../modules/users/graphql/user.typeDefs'
import { userResolvers } from '../modules/users/graphql/user.resolvers'
// import more as needed

export const schema = makeExecutableSchema({
    typeDefs: [userTypeDefs],
    resolvers: [userResolvers],
})
