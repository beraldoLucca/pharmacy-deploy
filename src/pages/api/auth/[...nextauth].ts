import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"

const options = { 
  // Configure one or more authentication providers
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
        }),
    // ...add more providers here
  ],
};

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> => NextAuth(req, res, options);