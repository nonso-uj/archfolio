import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { SOCIAL_ARRAY } from '@/utilities/constants'
import { revalidatePage } from './hooks/revalidatePage'
// import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const ContactPage: CollectionConfig<'contactPage'> = {
  slug: 'contactPage',
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
        return '/' + req?.user?.username + '/contact'
      },
    },
  },
  fields: [
    {
      name: 'address',
      label: 'Address',
      type: 'text',
    },
    {
      name: 'phoneNumber',
      label: 'Phone number',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email address',
      type: 'text',
    },
    {
      name: 'socials',
      label: 'Social media contacts',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Socials',
        plural: 'Socialss',
      },
      fields: [
        {
          name: 'platform',
          label: 'Platform',
          type: 'select',
          required: true,
          options: SOCIAL_ARRAY,
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
