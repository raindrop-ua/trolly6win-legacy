export function formatToDateTime(isoDate: string): string {
	const date = new Date(isoDate)
	const day = date.getDate().toString().padStart(2, '0')
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const year = date.getFullYear()
	const hours = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')
	return `${day}.${month}.${year} ${hours}:${minutes}`
}

export function formatTime(time: string): string {
	const str = time.split(':')
	if (str.length >= 2) {
		return `${str[0]}:${str[1]}`
	}
	return time
}
