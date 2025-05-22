import express from 'express'
import { createRequire } from 'node:module'

export function runServer(app: express.Application) {
  const desiredPort: number = Number(process.env.PORT ?? 1234)

  app.listen(desiredPort, () => {
    console.log(`Server running on http://localhost:${desiredPort}`)
  })
}

export const require = createRequire(import.meta.url)