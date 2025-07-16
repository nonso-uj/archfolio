import type { CollectionConfig } from 'payload'

import admin from '../Users/access/admin'
import user from '../Users/access/user'
import { ensureUniqueSlug } from './hooks/ensureUniqueSlug'

export const Slug: CollectionConfig = {
  slug: 'slug',
  access: {
    create: admin,
    delete: admin,
    read: () => true,
    update: user,
  },
  admin: {
    useAsTitle: 'name'
  },
  defaultPopulate: {
    name: true
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      unique: true,
      required: true,
      index: true,
      admin: {
        description: 'Used for url paths, example: /sas-portfolio/slug',
      },
      hooks: {
        beforeValidate: [ensureUniqueSlug]
      }
    },
    {
      name: 'allowPublicRead',
      type: 'checkbox',
      admin: {
        description:
          'If checked, logging in is not required to read. Useful for building public pages.',
        position: 'sidebar',
      },
      defaultValue: true,
      index: true,
    },
  ],
}
