import SpotifyProvider from "next-auth/providers/spotify"
import type { NextAuthOptions } from "next-auth"

interface SpotifyAccount {
    access_token: string,
    refresh_token: string,
    expires_in: number
}

interface SpotifyToken {
    accessToken: string,
    refreshToken: string,
    expiresAt: number,
    error?: string
}

// This function refreshes the access token using the refresh token
async function refreshAccessToken(token: SpotifyToken) {
    try {
        const url = "https://accounts.spotify.com/api/token"
        const body = new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: token.refreshToken
        })

        // Fetches a new access token using the refresh token
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Basic ` + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64"),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: body.toString()
        })

        const refreshedTokens = await response.json()

        if (!response.ok) throw refreshedTokens

        // Returns the new token
        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            expiresAt: Date.now() + refreshedTokens.expires_in * 1000, // = 1 hour as 3600 returns from Spotify API
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
        }
        // If the refresh token is invalid, return the original token
    } catch (error) {
        console.error("Error refreshing access token", error)
        return {
            ...token,
            error: "RefreshAccessTokenError"
        }
    }
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
            const spotifyToken = token as unknown as SpotifyToken

            // Checks if it's a new login and saves user account info in the token
            if (account) {
                const spotifyAccount = account as unknown as SpotifyAccount

                spotifyToken.accessToken = spotifyAccount.access_token;
                spotifyToken.refreshToken = spotifyAccount.refresh_token;
                spotifyToken.expiresAt = Date.now() + spotifyAccount.expires_in * 1000;
            }

            // If token is expired, refresh it
            if (Date.now() > spotifyToken.expiresAt) {
                return await refreshAccessToken(spotifyToken);
            }

            // Returns the token for use in session
            return spotifyToken
        },
        async session({session, token}) {
            console.log('SESSION CALLBACK', {session, token})
            const spotifyToken = token as unknown as SpotifyToken
            // Adds the token to the session to keep track of the login
            return { 
                ...session,
                accessToken: spotifyToken.accessToken,
                error: spotifyToken.error
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET
})