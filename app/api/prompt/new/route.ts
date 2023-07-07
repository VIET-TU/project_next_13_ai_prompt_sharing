import Prompt from '@/models/prompt'
import { connectToDB } from '@/utils/database'

type ResValue = {
	userId: string
	prompt: string
	tag: string
}

export const POST = async (req: Request) => {
	try {
		await connectToDB()
		const { userId, prompt, tag } = await req.json()
		const newPrompt = await Prompt.create({
			creator: userId,
			prompt,
			tag,
		})

		return new Response(JSON.stringify(newPrompt), { status: 201 })
	} catch (error) {
		console.log('error :>> ', error)
		return new Response(JSON.stringify('Failed to create a new  Prompt'), { status: 500 })
	}
}
