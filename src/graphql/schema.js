"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const schema_1 = require("@graphql-tools/schema");
const user_typeDefs_1 = require("../modules/users/graphql/user.typeDefs");
const user_resolvers_1 = require("../modules/users/graphql/user.resolvers");
// import more as needed
exports.schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: [user_typeDefs_1.userTypeDefs],
    resolvers: [user_resolvers_1.userResolvers],
});
