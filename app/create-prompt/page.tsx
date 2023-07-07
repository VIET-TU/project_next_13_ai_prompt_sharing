'use client'
import Form from '@/components/Form'
import { DefaultSession, User } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface UserPlus {
	username: string
	_id?: string
}

export interface IPost {
	prompt: string
	tag: string
	creator?: User & UserPlus
	_id?: string
}

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's postal address. */
			id?: string
			_id?: string
			username?: string
		} & DefaultSession['user']
	}
}

const CreatePrompt = () => {
	const router = useRouter()
	const { data: session } = useSession()
	const [submitting, setIsSubmitting] = useState(false)
	const [post, setPost] = useState<IPost>({ prompt: '', tag: '' })
	const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			const response = await fetch('/api/prompt/new', {
				method: 'POST',
				body: JSON.stringify({
					prompt: post.prompt,
					userId: session?.user?.id,
					tag: post.tag,
				}),
			})

			if (response.ok) {
				router.push('/')
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsSubmitting(false)
		}
	}
	return (
		<Form
			type="Create"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPrompt}
		/>
	)
}

export default CreatePrompt
