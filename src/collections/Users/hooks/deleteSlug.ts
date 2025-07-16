import type {
  CollectionBeforeDeleteHook
} from 'payload'

import { ValidationError } from 'payload'

export const deleteSlug: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const findUser = await req.payload.find({
    collection: 'users',
    where: {
      id: {
        equals: id,
      },
    },
  })

  if (findUser.docs.length > 0 && req.user) {
    // @ts-ignore - selectedTenant will match DB ID type
    console.log('runnnn===', findUser.docs[0].tenants?.[0].tenant.id)
    const userTenant = findUser.docs[0].tenants?.[0]
    if (userTenant) {
      try {
        const deleteTenantAttempt = await req.payload.delete({
          collection: 'slug',
          where: {
            id: {
              // @ts-ignore - selectedTenant will match DB ID type
              equals: userTenant.tenant.id,
            },
          },
          req,
        })

        console.log('tenant deleted===', deleteTenantAttempt)
      } catch (error) {
        throw new ValidationError({
          errors: [
            {
              message: `Something went wrong during delete, check your connection and try again`,
              path: 'tenants',
            },
          ],
        })
      }
    } else {
      throw new ValidationError({
        errors: [
          {
            message: `User could not be deleted`,
            path: 'tenants',
          },
        ],
      })
    }
  }

  return id
}
