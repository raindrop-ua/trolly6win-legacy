export function setThemeCookie(theme: 'light' | 'dark' | 'auto') {
	document.cookie = `theme=${theme}; Path=/; Expires=${new Date(Date.now() + 31536000000).toUTCString()}; SameSite=Strict`
}
