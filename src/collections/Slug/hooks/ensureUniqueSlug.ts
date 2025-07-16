import type { FieldHook, Where } from 'payload'

import { ValidationError } from 'payload'

export const ensureUniqueSlug: FieldHook = async ({
  originalDoc,
  req,
  value,
}) => {
  // if value is unchanged, skip validation
  if (originalDoc.name === value) {
    return value
  }

  console.log('slug hook===', value)

  const findDuplicateSlugs = await req.payload.find({
    collection: 'slug',
    where: {
      name: {
        equals: value,
      },
    },
  })

  
  if (findDuplicateSlugs.docs.length > 0) {
      console.log('slug hook docs inside===', findDuplicateSlugs.docs)
    throw new ValidationError({
      errors: [
        {
          message: `A user with the slug ${value} already exists`,
          path: 'name',
        },
      ],
    })
  }

  return value
}
