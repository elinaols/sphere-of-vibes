import NextAuth from 'next-auth'
import { JWT as DefaultJWT } from 'next-auth/jwt'

declare module "next-auth" {
    interface Session {
        accessToken?: string
        token?: JWT
        expired?: boolean
    }
    interface JWT extends DefaultJWT {
        id?: string
        accessToken?: string
        refreshToken?: string
        expiresAt?: number
        expired?: boolean
    }
}