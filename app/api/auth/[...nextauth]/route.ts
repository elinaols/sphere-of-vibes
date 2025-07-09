import NextAuth from "next-auth"
import { authOptions } from "./authOptions"

// Creates handler for authentication requests (login, logout, session)
const handler = NextAuth(authOptions)

// Exports route handlers GET and POST for next routing
export { handler as GET, handler as POST}