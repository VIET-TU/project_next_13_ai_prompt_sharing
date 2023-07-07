import User from '@/models/user'
import { connectToDB } from '@/utils/database'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	callbacks: {
		async session({ session }) {
			// store the user id from MongoDB to session
			await connectToDB()
			const sessionUser = await User.findOne({ email: session?.user?.email })
			session!.user!.id = sessionUser._id.toString()
			return session
		},
		async signIn({ profile }) {
			try {
				await connectToDB()

				// check if user already exists
				const userExists = await User.findOne({ email: profile?.email })
				//   // if not, create a new document and save user in MongoDB
				if (!userExists) {
					const _profile: any = profile
					await User.create({
						email: _profile?.email,
						username: _profile?.given_name + ' ' + _profile?.family_name,
						image: _profile?.picture,
					})
				}
				return true
			} catch (error) {
				console.log('Error checking if user exists: ', error)
				return false
			}
		},
	},
})

export { handler as GET, handler as POST }
