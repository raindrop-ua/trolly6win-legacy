export function formatToDateTime(isoDate: string): string {
	const date = new Date(isoDate)

	const formattedDate = date.toLocaleString('en-US', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	})

	return formattedDate.replace(',', '')
}

export function formatTime(time: string): string {
	const str = time.split(':')
	if (str.length >= 2) {
		return `${str[0]}:${str[1]}`
	}
	return time
}

export const capitalizeString = (str: string | null): string => {
	if (str === null) return ''
	return str.charAt(0).toUpperCase() + str.slice(1)
}
