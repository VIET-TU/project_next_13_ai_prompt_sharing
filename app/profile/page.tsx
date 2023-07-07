'use client'
import Profile from '@/components/Profile'
import * as React from 'react'
import { IPost } from '../create-prompt/page'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export interface IMyProfilelProps {}

export default function MyProfile(props: IMyProfilelProps) {
	const { data: session } = useSession()
	const router = useRouter()
	const [myPosts, setMyPosts] = React.useState<IPost[]>([])
	React.useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/posts`)
			const data = await response.json()
			setMyPosts(data)
		}
		if (session?.user.id) fetchPosts()
	}, [])

	const handleEdit = (post: IPost) => {
		router.push(`/update-prompt?id=${post._id}`)
	}

	const handleDelete = async (post: IPost) => {
		const hasConfirmed = confirm('Are you sure you want to delete this prompt')
		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id}`, {
					method: 'DELETE',
				})
				const fileteredPosts = myPosts.filter((p) => p._id !== post._id)
				setMyPosts(fileteredPosts)
			} catch (error) {}
		}
	}

	return (
		<Profile
			name="My"
			desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
			data={myPosts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	)
}
