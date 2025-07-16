import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { revalidatePage } from './hooks/revalidatePage'
// import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const AboutPage: CollectionConfig<'aboutPage'> = {
  slug: 'aboutPage',
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
        return '/' + req?.user?.username + '/about'
      },
    },
  },
  fields: [
    {
      name: 'aboutImage',
      label: 'About page image',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'aboutText',
      label: 'About me text',
      type: 'textarea',
    },
    {
      name: 'workingExperience',
      label: 'Working Experience',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Experience',
        plural: 'Experiences',
      },
      fields: [
        {
          label: 'Role',
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          label: 'Start date',
          name: 'startDate',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'MMMM yyyy',
            },
          },
        },
        {
          label: 'End date',
          name: 'endDate',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'MMMM yyyy',
            },
          },
        },
      ],
    },
    {
      name: 'services',
      label: 'Services you render',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Service',
        plural: 'Services',
      },
      fields: [
        {
          name: 'service',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'contact',
      label: 'Social media contacts',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Contact',
        plural: 'Contacts',
      },
      fields: [
        {
          name: 'name',
          label: 'Name (Facebook, X, etc)',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
          required: true,
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
