const fs = require('fs')
const path = require('path')

const colorRegex =
	/#[0-9a-fA-F]{3,8}|rgba?\([\d\s.,%]+\)|rgb\(\s*[\d\s]+\/\s*[\d.%]+\s*\)/g
const targetExtensions = ['.css', '.scss', '.js', '.jsx', '.ts', '.tsx']

function getAllFiles(dir, files = []) {
	const entries = fs.readdirSync(dir)
	for (const entry of entries) {
		const fullPath = path.join(dir, entry)
		if (fs.statSync(fullPath).isDirectory()) {
			getAllFiles(fullPath, files)
		} else if (targetExtensions.includes(path.extname(fullPath))) {
			files.push(fullPath)
		}
	}
	return files
}

function extractColors(filePath) {
	const content = fs.readFileSync(filePath, 'utf-8')
	const matches = content.match(colorRegex)
	return matches ? matches.map((color) => color.trim()) : []
}

function main() {
	const projectDir = path.resolve(__dirname, './src')
	const files = getAllFiles(projectDir)
	const colorSet = new Set()

	files.forEach((file) => {
		const colors = extractColors(file)
		colors.forEach((color) => colorSet.add(color))
	})

	const uniqueColors = Array.from(colorSet)
	console.log('Unique colors found:', uniqueColors)

	fs.writeFileSync(
		'unique-colors.json',
		JSON.stringify(uniqueColors, null, 2),
		'utf-8',
	)
}

main()
