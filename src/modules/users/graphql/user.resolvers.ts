export const userResolvers = {
  Query: {
    users: async () => {
      // replace with your DB logic
      return [
        { id: "1", name: "Amr", email: "amr@mail.com" }
      ]
    }
  }
}
