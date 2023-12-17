export type UserDto = {
  fullname: string
  email: string
  password: string
  gender: string
  adminKey: string
}
export type LoginDto = {
  email: string
  password: string
  adminKey?: string
}

export interface IUser {
  fullname: string
  email: string
  password?: string
  gender: 'M' | 'F'
  verified: boolean
  authority: number
  leave: boolean
}
