import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { Buffer } from 'node:buffer'
import { execFile } from 'node:child_process'

const readBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })

// Run one git command via PowerShell. Never rejects — returns captured output
// so a "nothing to commit" doesn't abort the publish.
const git = (args) =>
  new Promise((resolve) => {
    execFile('powershell.exe', ['-NoProfile', '-Command', `git ${args}`],
      (err, stdout, stderr) => resolve({ ok: !err, out: (stdout || '') + (stderr || '') }))
  })

// ponytail: dev-only editor backend. Never ships — configureServer runs only
// under `npm run dev`. The built static site has no such endpoints.
function editorApi() {
  return {
    name: 'portfolio-editor-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          if (req.method === 'POST' && req.url === '/api/save') {
            const body = (await readBody(req)).toString('utf8')
            JSON.parse(body) // reject garbage before overwriting the file
            fs.writeFileSync(path.resolve('src/content.json'), body)
            res.statusCode = 200
            return res.end('ok')
          }
          if (req.method === 'POST' && req.url.startsWith('/api/upload')) {
            const name = new URL(req.url, 'http://x').searchParams.get('name') || ''
            const safe = path.basename(name) // strip any path traversal
            if (!safe) {
              res.statusCode = 400
              return res.end('bad name')
            }
            fs.writeFileSync(path.resolve('public/images', safe), await readBody(req))
            res.setHeader('Content-Type', 'application/json')
            return res.end(JSON.stringify({ path: `/images/${safe}` }))
          }
          if (req.method === 'POST' && req.url === '/api/publish') {
            const body = JSON.parse((await readBody(req)).toString('utf8') || '{}')
            // strip anything that could break out of the -m "..." quoting
            const msg = String(body.message || 'Update portfolio content').replace(/["`$\r\n]/g, '').slice(0, 200)
            const add = await git('add -A')
            const commit = await git(`commit -m "${msg}"`)
            const push = await git('push')
            const log = [add.out, commit.out, push.out].filter(Boolean).join('\n').trim()
            res.statusCode = push.ok ? 200 : 500
            return res.end(log || (push.ok ? 'pushed' : 'push failed'))
          }
        } catch (e) {
          res.statusCode = 400
          return res.end(String(e?.message || 'error'))
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), editorApi()],
})
