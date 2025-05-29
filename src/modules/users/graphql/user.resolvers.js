"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
exports.userResolvers = {
    Query: {
        users: async () => {
            // replace with your DB logic
            return [
                { id: "1", name: "Amr", email: "amr@mail.com" }
            ];
        }
    }
};
