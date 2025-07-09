import NextAuth from 'next-auth'

declare module "next-auth" {
    interface Session {
        accessToken?: string
        token?: {
            accessToken: string
        }
    }
    interface JWT {
        accessToken?: string
    }
}