import SpotifyProvider from "next-auth/providers/spotify"
import type { NextAuthOptions } from "next-auth"

interface SpotifyAccount {
    id: string,
    access_token: string,
    refresh_token: string,
    expires_in: number
}

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
                const spotifyAccount = account as unknown as SpotifyAccount
                
                token.id = spotifyAccount.id;
                token.expiresAt = Date.now() + spotifyAccount.expires_in * 1000;
                token.accessToken = spotifyAccount.access_token;
            }

            if (Date.now() > (token.expiresAt as number)) {
                token.expire = true
            }

            // Returns the token for use in session
            return token
        },
        async session({session, token}) {
            console.log('SESSION CALLBACK', {session, token})
            // Adds the token to the session to keep track of the login
            session.token = token
            session.accessToken = (token as {accessToken?: string}).accessToken
            session.expired = (token as {expired?: boolean}).expired ?? false
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET
})