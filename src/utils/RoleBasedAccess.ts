import User from '../models/User'

class RoleBasedAccess {
  protected localKey: string
  protected user: User

  constructor(user: User, localKey: string) {
    this.user = user
    this.localKey = localKey
  }

  public denied(): boolean {
    // const groupRoles = this.user.
    return false
  }
}

export default RoleBasedAccess
