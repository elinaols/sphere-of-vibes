import SpotifyProvider from "next-auth/providers/spotify"
import type { NextAuthOptions } from "next-auth"

// Configuration to be able to authenticate users with the SpotifyProvider
export const authOptions: NextAuthOptions = ({
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
            console.log('JWT CALLBACK', {token, account})
            // Checks if it's a new login and saves user account info in the token
            if (account) {
                token.id = account.id;
                token.expires_at = account.expiresAt;
                token.accessToken = account.accessToken;
            }

            if (Date.now() > (token.expiresAt as number)) {
                return {
                    ...token,
                    expired: true
                } 
            }

            // Returns the token for use in session
            return token
        },
        async session({session, token}) {
            console.log('SESSION CALLBACK', {session, token})
            // Adds the token to the session to keep track of the login
            session.token = token
            session.expired = (token as {expired?: boolean}).expired ?? false
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET
})