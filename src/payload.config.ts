// storage-adapter-import-placeholder
import { buildConfig, Config } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { cloudinaryStorage } from 'payload-cloudinary'
// import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { HomePage } from './collections/HomePage'
import { Slug } from './collections/Slug'
import { checkRole } from './collections/Users/access/checkRole'
import { User } from './payload-types'
import { Work } from './collections/Work'
import { AboutPage } from './collections/AboutPage'
import { ContactPage } from './collections/ContactPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '@/components/Logo#Logo', // shown on login/signup
        Icon: '@/components/Icon#Icon', // shown in admin sidebar
      },
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    meta: {
      titleSuffix: ' - Archfolio',
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile',  name: 'mobile',  width: 375,  height: 667 },
        { label: 'Tablet',  name: 'tablet',  width: 768,  height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
        // { label: 'Responsive', name: 'responsive' }, // optional fluid option
      ],
    },
  },
  collections: [HomePage, AboutPage, Work, ContactPage, Media, Slug, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  // email: nodemailerAdapter({
  //   defaultFromAddress: 'nonso.udonne@gmail.com',
  //   defaultFromName: 'Nonso',
  //   // Nodemailer transportOptions
  //   transportOptions: {
  //     host: process.env.SMTP_HOST,
  //     port: 587,
  //     auth: {
  //       user: process.env.SMTP_USER,
  //       pass: process.env.SMTP_PASS,
  //     },
  //   },
  // }),
  sharp,
  upload: {
    limits: {
      fileSize: 1000000, // 5MB, written in bytes
    },
  },
  plugins: [
    multiTenantPlugin<Config>({
      tenantsSlug: 'slug',
      collections: {
        homePage: {
          isGlobal: true,
        },
        aboutPage: {
          isGlobal: true,
        },
        contactPage: {
          isGlobal: true,
        },
        media: {},
        work: {},
      },
      tenantField: {
        access: {
          read: () => true,
          update: ({ req: { user } }) => checkRole(['admin'], user as User),
        },
      },
      // tenantsArrayField: {
      //   includeDefaultField: false,
      // },
      userHasAccessToAllTenants: (user) => checkRole(['admin'], user as User),
    }),
    cloudinaryStorage({
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
        api_key: process.env.CLOUDINARY_API_KEY || '',
        api_secret: process.env.CLOUDINARY_API_SECRET || '',
      },
      collections: {
        media: true, // Enable for media collection
        // Add more collections as needed
      },
      folder: 'sas-media', // Optional, defaults to 'payload-media'
      disableLocalStorage: true, // Optional, defaults to true
      publicID: {
        enabled: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        generatePublicID: (filename: string, prefix: any, folder: any) => {
          // Create a sanitized slug from the filename
          const sanitizedName = filename
            .toLowerCase()
            .replace(/\.[^/.]+$/, '')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')

          return `${folder}/${sanitizedName}`
        },
      },
    }),
    // storage-adapter-placeholder
    payloadCloudPlugin(),
  ],
})
