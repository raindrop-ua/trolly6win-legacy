'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const VideoPlayer = () => {
	return (
		<div>
			<ReactPlayer
				loop={false}
				muted={false}
				volume={100}
				controls={true}
				playing={true}
				width='100%'
				height='100%'
				style={{ cursor: 'pointer', objectFit: 'cover' }}
				config={{
					file: {
						attributes: {
							controlsList: 'nodownload noremoteplayback noplaybackrate',
							disablePictureInPicture: true,
						},
					},
				}}
				url='https://www.youtube.com/watch?v=LXb3EKWsInQ'
			/>
		</div>
	)
}

export default VideoPlayer
