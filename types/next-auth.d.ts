import NextAuth from 'next-auth'

declare module "next-auth" {
    interface Session {
        accessToken?: string
        token?: {
            refreshToken: any
            expiresAt: number
            accessToken: string
        }
    }
    interface JWT {
        accessToken?: string
    }
}