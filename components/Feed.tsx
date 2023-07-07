'use client'
import { IPost } from '@/app/create-prompt/page'
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react'
import PromptCard from './PromptCard'

interface IPromptCradListProps {
	data: IPost[]
	handleTagClick: (tagname: string) => void
}

const PromptCardList = ({ data, handleTagClick }: IPromptCradListProps) => {
	return (
		<div className="mt-16 prompt_layout">
			{data?.map((post, index) => (
				<PromptCard key={post?._id} post={post} handleTagClick={handleTagClick} />
			))}
		</div>
	)
}

const Feed = () => {
	const [allPosts, setAllPosts] = useState<IPost[]>([])

	// Search states
	const [searchText, setSearchText] = useState('')
	const [searchTimeout, setSearchTimeout] = useState<any>(null)
	const [searchedResults, setSearchedResults] = useState<IPost[]>([])

	useEffect(() => {
		;(async () => {
			const response = await fetch('/api/prompt')
			const data = await response.json()
			setAllPosts(data)
		})()
	}, [])

	const filterPrompts = (searchtext: string): IPost[] => {
		const regex = new RegExp(searchtext, 'i') // 'i' flag for case-insensitive search
		return allPosts.filter(
			(item) =>
				regex.test(item?.creator?.username as string) ||
				regex.test(item.tag) ||
				regex.test(item.prompt)
		)
	}

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		clearTimeout(searchTimeout)
		setSearchText(e.target.value)
		// debounce method
		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterPrompts(e.target.value)
				setSearchedResults(searchResult)
			}, 500)
		)
	}

	const handleTagClick = (tagName: string) => {
		setSearchText(tagName)

		const searchResult = filterPrompts(tagName)
		setSearchedResults(searchResult)
	}

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			{/* All Prompts */}

			{searchText ? (
				<PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
			) : (
				<PromptCardList data={allPosts} handleTagClick={handleTagClick} />
			)}
		</section>
	)
}

export default Feed
