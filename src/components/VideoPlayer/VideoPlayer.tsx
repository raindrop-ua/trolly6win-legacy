'use client'

import React from 'react'
import styles from './VideoPlayer.module.scss'
import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const VideoPlayer = () => {
	return (
		<div className={styles.VidePlayer}>
			<ReactPlayer
				className={styles.Player}
				loop={false}
				muted={false}
				volume={1}
				controls={true}
				playing={false}
				width='100%'
				height='100%'
				pip={false}
				config={{
					file: {
						attributes: {
							controlsList: 'nodownload noremoteplayback noplaybackrate',
							disablePictureInPicture: true,
						},
					},
				}}
				url='/video/presentation.mp4'
			/>
		</div>
	)
}

export default VideoPlayer
