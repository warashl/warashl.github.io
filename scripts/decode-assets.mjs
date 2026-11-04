// Картинки хранятся в репозитории как base64-текст (site/assets/*.b64 или *.b64.N частями),
// перед сборкой раскодируем их в public/assets, откуда Vite копирует их в dist как есть.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const src = 'site/assets'
const dst = 'public/assets'
if (!existsSync(src)) process.exit(0)
mkdirSync(dst, { recursive: true })
const groups = new Map()
for (const name of readdirSync(src)) {
  const m = name.match(/^(.+)\.b64(?:\.(\d+))?$/)
  if (!m) continue
  if (!groups.has(m[1])) groups.set(m[1], [])
  groups.get(m[1]).push([Number(m[2] || 0), name])
}
for (const [target, parts] of groups) {
  parts.sort((a, b) => a[0] - b[0])
  const data = parts.map(([, n]) => readFileSync(join(src, n), 'utf8').trim()).join('')
  const buf = Buffer.from(data, 'base64')
  writeFileSync(join(dst, target), buf)
  console.log(`${dst}/${target} ${buf.length}`)
}
