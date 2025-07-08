import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

// Configuration to be able to authenticate users with the SpotifyProvider
const handler = NextAuth ({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state"
                }
            }
        }),
    ],
    callbacks: {
        async jwt({token, account}) {
            if (account) {
                token.access_token = account.access_token
            }
            return token
        },
        async session({session, token}) {
            session.accessToken = token.accessToken as string
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET!
})

export { handler as GET, handler as POST}