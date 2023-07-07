import Prompt from '@/models/prompt'
import { connectToDB } from '@/utils/database'
import { NextApiRequest, NextApiResponse } from 'next'

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
	try {
		await connectToDB()
		const prompts = await Prompt.find({
			creator: params.id,
		}).populate('creator')

		return new Response(JSON.stringify(prompts), { status: 200 })
	} catch (error) {
		console.log('error :>> ', error)
		return new Response(JSON.stringify('Faild to fetch all prompts'), { status: 500 })
	}
}
