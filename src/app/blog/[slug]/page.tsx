import React from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import { Metadata } from 'next'
import styles from '../page.module.scss'
import PageTitle from '@/components/PageTitle'
import BlogPost from '@/components/BlogPost'
import Link from 'next/link'
import { LuArrowBigLeftDash } from 'react-icons/lu'

export const metadata: Metadata = {
	title: 'Blog - TrollySix',
	alternates: {
		canonical: 'https://trolly6.com/blog',
	},
}

// export async function generateMetadata(): Promise<Metadata> {
// 	const posts = await fetch(
// 		`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog?offset=0&limit=5`,
// 	).then((res) => res.json())
//
// 	return {
// 		title: 'Blog - TrollySix',
// 		alternates: {
// 			canonical: 'https://trolly6.com/blog',
// 		},
// 		description: `Welcome to the blog! Currently, we have ${posts.data.length} articles available.`,
// 	}
// }

export default async function BlogPostPage({
	params: rawParams,
}: {
	params: Promise<{ slug: string }>
}) {
	const params = await rawParams
	const { slug } = params

	const post = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/${slug}`,
	)
		.then((res) => res.json())
		.then((res) => res.data)
		.catch((error) => {
			console.error('Failed to fetch post:', error)
			return { data: null }
		})

	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<PageTitle isPrimary>
					<Link href={'/blog'}>
						<LuArrowBigLeftDash aria-hidden={true} />
						<span>Blog</span>
					</Link>
				</PageTitle>
				{post ? (
					<BlogPost post={post} />
				) : (
					<p>Sorry, the post could not be loaded.</p>
				)}
			</SectionWrapper>
			<br />
		</main>
	)
}
