import Prompt from '@/models/prompt'
import { connectToDB } from '@/utils/database'
import { NextApiRequest } from 'next'

// GET (read)
export const GET = async (res: Request, { params }: { params: { id: string } }) => {
	try {
		await connectToDB()
		const prompt = await Prompt.findById(params.id).populate('creator')

		if (!prompt) return new Response(JSON.stringify('Prompt is not found'), { status: 404 })

		return new Response(JSON.stringify(prompt), { status: 200 })
	} catch (error) {
		console.log('error :>> ', error)
		return new Response(JSON.stringify('Faild to fetch all prompts'), { status: 500 })
	}
}

// PATCH (update)
export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
	try {
		const { prompt, tag } = await request.json()
		await connectToDB()
		const exitingPrompt = await Prompt.findById(params.id)
		if (!exitingPrompt) return new Response(JSON.stringify('Prompt is not found'), { status: 404 })
		exitingPrompt.prompt = prompt
		exitingPrompt.tag = tag

		await exitingPrompt.save()

		return new Response(JSON.stringify(exitingPrompt), { status: 200 })
	} catch (error) {
		console.log('error :>> ', error)
		return new Response(JSON.stringify('Faild to fetch all prompts'), { status: 500 })
	}
}

// DELETE (delete)
export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
	try {
		await connectToDB()

		await Prompt.findByIdAndDelete(params.id)

		return new Response('Prompt deleted successfully', { status: 200 })
	} catch (error) {
		console.log('error :>> ', error)
		return new Response(JSON.stringify('Faild to fetch all prompts'), { status: 500 })
	}
}
