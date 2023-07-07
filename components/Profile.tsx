import * as React from 'react'
import PromptCard from './PromptCard'
import { IPost } from '@/app/create-prompt/page'

export interface IProfileProps {
	name: string
	desc: string
	data: IPost[]
	handleEdit?: (post: IPost) => void
	handleDelete?: (post: IPost) => void
}

export default function Profile({ name, desc, data, handleEdit, handleDelete }: IProfileProps) {
	return (
		<section className="w-full">
			<h1 className="text-left head_text">
				<span className="blue_gradient">{name} Profile</span>
			</h1>
			<p className="text-left desc">{desc}</p>

			<div className="mt-10 prompt_layout">
				{data?.map((post) => (
					<PromptCard
						key={post._id}
						post={post}
						handleEdit={() => handleEdit && handleEdit(post)}
						handleDelete={() => handleDelete && handleDelete(post)}
					/>
				))}
			</div>
		</section>
	)
}
