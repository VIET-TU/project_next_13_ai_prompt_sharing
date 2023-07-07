import Nav from '@/components/Nav'
import Provider from '@/components/Provider'
import '@/styles/globals.scss'
import { Session } from 'next-auth'

export default function RootLayout({
	children,
	session,
}: {
	children: React.ReactNode
	session: Session
}) {
	return (
		<html lang="en">
			<body>
				<Provider session={session}>
					<div className="main">
						<div className="gradient"></div>
					</div>
					<main className="app">
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	)
}
