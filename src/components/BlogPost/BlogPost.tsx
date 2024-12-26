import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { IBlogPost } from '@/types/blog-post'
import styles from './BlogPost.module.scss'
import { formatISODate } from '@/utils/helpers'
import ReactMarkdown from 'react-markdown'

const BlogPost = ({
	post,
	isShort,
}: {
	post: IBlogPost
	isShort?: boolean
}) => {
	const postType = {
		news: 'News',
		'release-note': 'Release note',
		article: 'Article',
		video: 'Video',
		photo: 'Photo',
	}[post.postType]

	return (
		<div className={styles.BlogPost}>
			<div className={styles.PostDecoration}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 303 177'
					preserveAspectRatio='xMidYMid meet'
					fill='none'
				>
					<path
						fill='currentColor'
						d='M65.7 0 .7 176.6h78.9L144.6 0h-79ZM223.5 0l-65 176.6h78.9L302.4 0h-79Z'
					/>
				</svg>
			</div>
			<div className={styles.Header}>
				<h2>{post.title}</h2>
				<div className={styles.HeaderInfo}>
					<div>Posted at: {formatISODate(post.createdAt)}</div>
					<div>{postType}</div>
				</div>
			</div>
			{post.imageUrl && (
				<div className={styles.Image}>
					<Image
						src={post.imageUrl}
						width={992}
						height={436}
						alt={post.title}
						quality={50}
						priority={false}
						placeholder={'blur'}
						blurDataURL={'/assets/blur.jpg'}
					/>
				</div>
			)}
			{!isShort ? (
				<div className={styles.Content}>
					<ReactMarkdown>{post.content}</ReactMarkdown>
				</div>
			) : (
				<>
					<div className={styles.Content}>
						<ReactMarkdown>{post.shortContent}</ReactMarkdown>
					</div>
					{post.content && (
						<div className={styles.Footer}>
							<Link href={`/blog/${post.slug}`}>Read more</Link>
						</div>
					)}
				</>
			)}
		</div>
	)
}

BlogPost.displayName = 'BlogPost'

export default BlogPost
