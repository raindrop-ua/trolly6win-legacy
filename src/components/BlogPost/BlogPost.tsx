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
	return (
		<div className={styles.BlogPost}>
			<div className={styles.Header}>
				<h2>{post.title}</h2>
				<div className={styles.HeaderInfo}>
					<div>Posted at: {formatISODate(post.createdAt)}</div>
					<div>{post.postType}</div>
				</div>
			</div>
			{post.imageUrl && (
				<div className={styles.Image}>
					<Image
						src={post.imageUrl}
						width={992}
						height={436}
						alt={post.title}
						quality={65}
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
					<div className={styles.Footer}>
						<Link href={`/blog/${post.slug}`}>Read More</Link>
					</div>
				</>
			)}
		</div>
	)
}

BlogPost.displayName = 'BlogPost'

export default BlogPost
