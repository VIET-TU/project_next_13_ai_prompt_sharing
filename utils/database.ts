import mongoose from 'mongoose'

export const connectToDB = async () => {
	try {
		await mongoose.connect(process.env.URL_MONGODB as string)
	} catch (error) {
		console.log('error :>> ', error)
	}
}
