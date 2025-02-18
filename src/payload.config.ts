// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Category } from './collections/Category'
import { Bookmark } from './collections/Bookmark'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
// const cors = {
//   origin: [
//     'http://localhost:3001', // Your Next.js frontend in development
//     // Your production domain
//   ],
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   credentials: true, // Important for authentication
//   allowedHeaders: [
//     'Content-Type',
//     'Authorization',
//     'x-user-id', // If you're using custom headers
//     'Content-Length',
//     'Accept',
//     'Origin',
//     'Host',
//   ],
// }
export default buildConfig({
  admin: {
    disable: true,
  },
  // cors: cors.origin,

  collections: [Category, Bookmark, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
