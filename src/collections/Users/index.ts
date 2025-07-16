import type { CollectionConfig } from 'payload'

import { protectRoles } from './hooks/protectRoles'
import { checkRole } from './access/checkRole'
import { User } from '@/payload-types'
import user from './access/user'
import adminOrUnauthenticated from './access/adminOrUnauthenticated'
import { ensureUniqueUsername } from './hooks/ensureUniqueUsername'
import { externalUsersSignup } from './endpoints/externalUsersSignup'
import { deleteSlug } from './hooks/deleteSlug'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: adminOrUnauthenticated,
    delete: user,
    read: user,
    update: user,
  },
  admin: {
    defaultColumns: ['username', 'email'],
    useAsTitle: 'username',
  },
  auth: true,
  endpoints: [
    externalUsersSignup,
    {
      path: '/fullName/:slug',
      method: 'get',
      handler: async (req) => {
        // @ts-ignore
        const slug = (await req.routeParams.slug) || ''
        console.log('called endpoint===', slug)

        if (slug) {
          const user = await req.payload.find({
            collection: 'users',
            pagination: false,
            depth: 2,
            draft: false,
            limit: 1,
            select: {
              fullName: true,
            },
            where: {
              username: {
                equals: slug,
              },
            },
          })
          return Response.json({
            message: 'successfully updated tracking info',
            user,
          })
        }
        return Response.json({
          message: 'no user',
        })
      },
    },
  ],
  fields: [
    {
      name: 'username',
      type: 'text',
      unique: true,
      hooks: {
        beforeValidate: [ensureUniqueUsername],
      },
      index: true,
    },
    {
      name: 'fullName',
      label: 'Full name',
      type: 'text',
      required: false,
      index: true,
    },
    {
      name: 'roles',
      type: 'select',
      defaultValue: ['user'],
      hasMany: true,
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      hooks: {
        beforeChange: [protectRoles],
      },
      access: {
        read: ({ req: { user } }) => checkRole(['admin'], user as User),
        create: ({ req: { user } }) => checkRole(['admin'], user as User),
        update: ({ req: { user } }) => checkRole(['admin'], user as User),
      },
    },
  ],
  hooks: {
    beforeDelete: [deleteSlug],
  },
  timestamps: true,
}
