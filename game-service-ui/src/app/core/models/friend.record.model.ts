interface Friend {
  _id: string,
  username: string
}

export interface FriendRecordModel {
  friend: Friend,
  status: string
}
