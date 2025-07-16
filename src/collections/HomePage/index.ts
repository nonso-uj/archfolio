import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { revalidatePage } from './hooks/revalidatePage'
import { SOFTWARE_LIST } from '@/utilities/constants'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const HomePage: CollectionConfig<'homePage'> = {
  slug: 'homePage',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    description:
      'Click on publish to save your changes and then click the eye icon to see your changes live right here!',
    livePreview: {
      url: ({ req }) => {
        return '/' + req?.user?.username
      },
    },
    // preview: (data, { req }) =>
    //   generatePreviewPath({
    //     slug: typeof data?.slug === 'string' ? data.slug : '',
    //     collection: 'homePage',
    //     req,
    //   }),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero section',
          fields: [
            {
              name: 'heroImage',
              label: 'Home page image',
              type: 'relationship',
              relationTo: 'media',
            },
            {
              name: 'heroText',
              label: 'Your name',
              type: 'text',
            },
          ],
        },
        {
          label: 'About section',
          fields: [
            {
              name: 'aboutText',
              label: 'A little bit about you',
              type: 'textarea',
            },
            {
              name: 'skills', // required
              label: 'Your skills',
              type: 'select', // required
              hasMany: true,
              admin: {
                isClearable: true,
                isSortable: true, // use mouse to drag and drop different values, and sort them according to your choice
                description: 'Pick as many as you want',
              },
              options: SOFTWARE_LIST,
            },
          ],
        },
        {
          label: 'Works section',
          fields: [
            {
              name: 'topWorks',
              label: 'Top works (max 4)',
              type: 'array',
              minRows: 1,
              maxRows: 4,
              labels: {
                singular: 'Work',
                plural: 'Works',
              },
              fields: [
                {
                  name: 'topWork',
                  type: 'relationship',
                  // change to works collection
                  relationTo: 'work',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Footer images',
          admin: {
            description: 'Images that show up at the base of your home page',
          },
          fields: [
            {
              name: 'images',
              label: 'Images',
              type: 'array',
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
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: true,
  },
}
