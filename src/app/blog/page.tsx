import React from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import { Metadata } from 'next'
import { IBlogPost } from '@/types/blog-post'
import styles from './page.module.scss'
import PageTitle from '@/components/PageTitle'
import BlogPost from '@/components/BlogPost'

export const metadata: Metadata = {
	title: 'Blog - TrollySix',
	alternates: {
		canonical: 'https://trolly6.win/blog',
	},
}

export async function generateStaticParams() {
	return await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog?offset=0&limit=10`,
	)
		.then((res) => res.json())
		.then((res) => res.data)
}

export default async function BlogPage() {
	const blog = await generateStaticParams()

	return (
		<main className={styles.Main}>
			<SectionWrapper>
				<PageTitle isPrimary>Blog</PageTitle>
				{blog?.posts?.map((item: IBlogPost) => (
					<BlogPost key={item.id} isShort post={item}></BlogPost>
				))}
			</SectionWrapper>
			<br />
		</main>
	)
}
