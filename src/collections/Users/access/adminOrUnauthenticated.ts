import type { Access } from 'payload'
import { checkRole } from './checkRole'

const adminOrUnauthenticated: Access = ({ req: { user } }) => {
  if (!user) {
    return true
  }

  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }
  }

  return false
}

export default adminOrUnauthenticated
