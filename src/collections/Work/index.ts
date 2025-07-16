import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { FixedToolbarFeature, lexicalEditor, BlocksFeature } from '@payloadcms/richtext-lexical'
import { SOFTWARE_LIST } from '@/utilities/constants'
import { slugField } from '@/fields/slug'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { revalidatePage } from './hooks/revalidatePage'
// import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const Work: CollectionConfig<'work'> = {
  slug: 'work',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'role', 'softwareUsed', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        return '/' + req?.user?.username + '/works/' + data?.slug
      },
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'softwareUsed', // required
      label: 'Software used',
      type: 'select', // required
      hasMany: true,
      admin: {
        isClearable: true,
        isSortable: true, // use mouse to drag and drop different values, and sort them according to your choice
      },
      options: SOFTWARE_LIST,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'text',
    },
    {
      name: 'details',
      label: 'Details',
      admin: {
        description: 'Description about how the project was carried out.',
      },
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            BlocksFeature({ blocks: [MediaBlock] }),
          ]
        },
      }),
    },
    {
      name: 'images',
      label: 'Images',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: true,
  },
}
