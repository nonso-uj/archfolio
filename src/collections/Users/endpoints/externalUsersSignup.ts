import type { Endpoint } from 'payload'
import { APIError } from 'payload'

// A custom endpoint that can be reached by POST request
// at: /api/users/external-users/login
export const externalUsersSignup: Endpoint = {
  handler: async (req) => {
    let data: { [key: string]: string } = {}

    try {
      if (typeof req.json === 'function') {
        data = await req.json()
      }
    } catch (error) {
      // swallow error, data is already empty object
      console.log('User creation error: ', error)
    }
    const { email, password, confirmPassword, username } = data

    if (confirmPassword !== password) {
      throw new APIError('Passwords should match.', 400, null, true)
    }

    if (!username || !password || !email) {
      throw new APIError('Username, Email and Password are required for login.', 400, null, true)
    }

    const testUsername = /[^a-z0-9\-]/.test(username)
    if (testUsername) {
      throw new APIError('Incorrect username format!', 400, null, true)
    }

    try {
      const createUserAttempt = await req.payload.create({
        collection: 'users',
        data: {
          username: username,
          email: email,
          password: password,
        },
        req,
      })

      const createTenantAttempt = await req.payload.create({
        collection: 'slug',
        data: {
          name: username,
          allowPublicRead: true,
        },
        req,
      })

      if (createTenantAttempt.id) {
        await req.payload.update({
          collection: 'users',
          where: {
            email: {
              equals: createUserAttempt.email,
            },
          },
          data: {
            tenants: [
              {
                tenant: createTenantAttempt?.id,
              },
            ],
          },
          req,
        })
      }

      if (createTenantAttempt.id && createUserAttempt.id) {
        return Response.json(createUserAttempt, {
          status: 200,
        })
      }

      throw new APIError('Unable to create a user.', 400, null, true)
    } catch (e) {
      console.log('user creation error===', e)
      throw new APIError(`Unable to create a user. ${e}`, 400, null, true)
    }
  },
  method: 'post',
  path: '/signup',
}
