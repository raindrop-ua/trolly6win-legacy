export function formatToDateTime(isoDate: string): string {
	const date = new Date(isoDate)
	const day = date.getDate().toString().padStart(2, '0')
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const year = date.getFullYear()
	const hours = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')
	return `${day}.${month}.${year} ${hours}:${minutes}`
}

export function formatToRelativeDate(isoDate: string): string {
	const date = new Date(isoDate)
	const now = new Date()
	const diffTime = now.getTime() - date.getTime()
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

	if (diffDays === 0) return 'Today'
	if (diffDays === 1) return 'Yesterday'
	return `${diffDays} days ago`
}

export function formatToDateSimple(isoDate: string): string {
	const date = new Date(isoDate)
	const day = date.getDate().toString().padStart(2, '0')
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const year = date.getFullYear()
	return `${day}.${month}.${year}`
}
