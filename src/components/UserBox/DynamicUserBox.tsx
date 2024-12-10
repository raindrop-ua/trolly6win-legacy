'use client'

import dynamic from 'next/dynamic'

const DynamicUserBox = dynamic(() => import('./UserBox'), { ssr: false })

export default DynamicUserBox
