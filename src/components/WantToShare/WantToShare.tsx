'use client'

import React, { useState } from 'react'
import styles from './WantToShare.module.scss'
import { LuQrCode } from 'react-icons/lu'
import QRCode from 'react-qr-code'
import ScheduleButton from '../ScheduleComponents/ScheduleButton'

const WantToShare: React.FC = () => {
	const [qrCodeVisible, setQrCodeVisible] = useState<boolean>(false)
	return (
		<div className={styles.WantToShare}>
			{!qrCodeVisible ? (
				<ScheduleButton onClick={() => setQrCodeVisible(true)} value={'true'}>
					<span>Want to share this app?</span>
					<LuQrCode />
				</ScheduleButton>
			) : (
				<div className={styles.WantToShareInnerWrapper}>
					<div>
						<QRCode
							size={256}
							style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
							value={'https://trolly6.com/'}
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
