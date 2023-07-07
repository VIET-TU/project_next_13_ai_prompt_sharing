'use client'

import React from 'react'
import {
	signIn,
	signOut,
	getProviders,
	LiteralUnion,
	ClientSafeProvider,
	useSession,
} from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BuiltInProviderType } from 'next-auth/providers'

const Nav = () => {
	const { data: session } = useSession()
	const [providers, setProviders] = useState<Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null>(null)
	const [toggleDropdown, setToggleDropdown] = useState(false)

	useEffect(() => {
		;(async () => {
			const res = await getProviders()
			setProviders(res)
		})()
	}, [])

	return (
		<nav className="flex justify-between w-full pt-3 mb-16 ">
			<Link href="/" className="flex gap-2 items-between">
				<Image src="/assets/images/logo.svg" width={30} height={30} alt="logo" />
				<p className="logo_text">Promptopia</p>
			</Link>

			{/* Desktop Navigation */}
			<div className="hidden sm:flex">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							{' '}
							Create Post
						</Link>
						<button type="button" onClick={() => signOut()} className="outline_btn">
							Sign out{' '}
						</button>
						<Link href="/profile">
							<Image
								src={session.user.image as string}
								width={37}
								height={37}
								className="rounded-full"
								alt="profile"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => {
										signIn(provider.id)
									}}
									className="black_btn"
								>
									Sign in
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile Navigation */}
			<div className="relative flex sm:hidden">
				{session?.user ? (
					<div className="flex">
						<Image
							src={session.user.image as string}
							width={37}
							height={37}
							className="rounded-full"
							alt="profile"
							onClick={() => setToggleDropdown(!toggleDropdown)}
						/>
						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									My Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									Create Prompt
								</Link>
								<button
									type="button"
									onClick={() => {
										setToggleDropdown(false)
										signOut()
									}}
									className="w-full mt-5 black_btn"
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => {
										signIn(provider.id)
									}}
									className="black_btn"
								>
									Sign in
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	)
}

export default Nav
