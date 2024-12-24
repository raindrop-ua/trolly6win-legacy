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

export function formatISODate(isoDate: string): string {
	const date = new Date(isoDate)

	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = String(date.getFullYear()).slice(2)
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')

	return `${day}.${month}.${year} ${hours}:${minutes}`
}

export function formatTime(time: string): string {
	const str = time.split(':')
	if (str.length >= 2) {
		return `${str[0]}:${str[1]}`
	}
	return time
}

export function capitalizeString(str: string | null): string {
	if (str === null) return ''
	return str.charAt(0).toUpperCase() + str.slice(1)
}
