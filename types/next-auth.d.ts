import NextAuth from 'next-auth'

declare module "next-auth" {
    interface Session {
        accessToken?: string
        token?: {
            accessToken: string
            refreshToken: string
            expiresAt: number
        }
    }
    interface JWT {
        accessToken?: string
    }
}