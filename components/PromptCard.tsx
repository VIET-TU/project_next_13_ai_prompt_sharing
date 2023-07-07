'use client'

import { IPost } from '@/app/create-prompt/page'
import { DefaultSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { before } from 'node:test'
import { useState } from 'react'

export interface IPromptCardProps {
	post: IPost
	handleTagClick?: (tagname: string) => void
	handleEdit?: () => void
	handleDelete?: () => void
}

export default function PromptCard({
	handleTagClick,
	post,
	handleEdit,
	handleDelete,
}: IPromptCardProps) {
	const router = useRouter()
	const [copied, setCopied] = useState<boolean | string>('')
	const { data: session } = useSession()
	const pathName = usePathname()
	// const router = useRouter()
	const handleCopy = () => {
		setCopied(post.prompt)
		navigator.clipboard.writeText(post.prompt)
		setTimeout(() => setCopied(false), 3000)
	}

	console.log('session client :>> ', session)

	const handleProfileClick = () => {
		console.log(post)

		if (post.creator?._id === session?.user.id) return router.push('/profile')

		router.push(`/profile/${post.creator?._id}?name=${post.creator?.username}`)
	}

	return (
		<div className="prompt_card">
			<div className="flex items-center justify-between gap-5">
				<div
					className="flex items-center justify-start gap-3 cursor-pointer"
					onClick={handleProfileClick}
				>
					<Image
						src={post.creator?.image as string}
						alt="user_image"
						width={30}
						height={40}
						className="rounded-full object-contain\"
					></Image>
					<div className="flex flex-col ">
						<h3 className="font-semibold text-gray-900 font-satoshi">{post?.creator?.username}</h3>
						<p className="text-sm text-gray-500 font-inter">{post.creator?.email}</p>
					</div>
				</div>
				<div className="copy_btn" onClick={handleCopy}>
					<Image
						src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
						alt={copied === post.prompt ? 'tick_icon' : 'copy_icon'}
						width={12}
						height={12}
					/>
				</div>
			</div>
			<p className="my-2 text-sm text-gray-700 font-satoshi">{post.prompt}</p>
			<p
				className="text-sm cursor-pointer font-inter blue_gradient"
				onClick={() => handleTagClick && handleTagClick(post?.tag)}
			>
				#{post.tag}
			</p>

			{session?.user.id === post.creator?._id && pathName === '/profile' && (
				<div className="gap-4 pt-3 mt-5 border-t border-gray-100 flex-center">
					<p className="text-sm cursor-pointer font-inter green_gradient" onClick={handleEdit}>
						Edit
					</p>
					<p className="text-sm cursor-pointer font-inter orange_gradient" onClick={handleDelete}>
						Delete
					</p>
				</div>
			)}
		</div>
	)
}
