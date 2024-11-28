'use client'

import React, { useState } from 'react'
import styles from './WantToShare.module.scss'
import { QrCode } from 'lucide-react'
import QRCode from 'react-qr-code'

const WantToShare: React.FC = () => {
	const [qrCodeVisible, setQrCodeVisible] = useState(false)
	return (
		<div className={styles.WantToShare}>
			{!qrCodeVisible ? (
				<button
					className={styles.Button}
					onClick={() => setQrCodeVisible(true)}
				>
					<span>Want to share this site?</span>
					<QrCode />
				</button>
			) : (
				<div className={styles.WantToShareInnerWrapper}>
					<div>
						<QRCode
							size={256}
							style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
							value={'https://trolly6.win/'}
							viewBox={`0 0 256 256`}
						/>
					</div>
				</div>
			)}
		</div>
	)
}

WantToShare.displayName = 'WantToShare'

export default React.memo(WantToShare)
