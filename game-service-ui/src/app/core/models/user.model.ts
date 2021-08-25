export interface UserModel {
  _id: string,
  email: string,
  username: string,
  password: string,
  token?: string,
  isFriendWithCurrentUser?: boolean,
}
