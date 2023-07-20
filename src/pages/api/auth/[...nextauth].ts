import NextAuth from "next-auth"

import GitHubProvider from "next-auth/providers/github";



export default NextAuth({

    providers: [
        GitHubProvider({
            // secret: process.env.NEXTAUTH_SECRET as string,
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ],
    callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

        console.log(email)
        console.log(user.email === 'd.ragkousis@gmail.com')
        if(user.email === 'd.ragkousis@gmail.com') return true;

        console.log(user)
      return false;
    },
},
})