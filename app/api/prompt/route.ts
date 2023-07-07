import Prompt from '@/models/prompt'
import { connectToDB } from '@/utils/database'
import { NextApiRequest } from 'next'

export const GET = async (res: Request) => {
	try {
		await connectToDB()
		const prompts = await Prompt.find({}).populate('creator')

		return new Response(JSON.stringify(prompts), { status: 200 })
	} catch (error) {
		console.log('error :>> ', error)
		return new Response(JSON.stringify('Faild to fetch all prompts'), { status: 500 })
	}
}
