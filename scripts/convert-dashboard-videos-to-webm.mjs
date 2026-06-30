import { access } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { basename, dirname, join } from 'node:path'

const videos = [
  'public/case-assets/data-screen-visualization/videos/gaolu-720.mp4',
  'public/case-assets/data-screen-visualization/videos/lianzhu-720.mp4',
  'public/case-assets/data-screen-visualization/videos/vd-720.mp4',
  'public/case-assets/data-screen-visualization/videos/zhuanlu-720.mp4',
  'public/case-assets/data-screen-visualization/videos/lf.mp4',
]

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`${command} exited with code ${code}`))
    })
  })

try {
  await run('ffmpeg', ['-version'])
} catch {
  console.warn('ffmpeg was not found. Install ffmpeg to generate WebM dashboard videos.')
  process.exit(0)
}

for (const input of videos) {
  try {
    await access(input)
  } catch {
    console.warn(`skip missing video: ${input}`)
    continue
  }

  const output = join(dirname(input), basename(input, '.mp4') + '.webm')
  await run('ffmpeg', ['-y', '-i', input, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '36', '-an', output])
}
