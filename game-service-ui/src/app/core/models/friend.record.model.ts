interface Friend {
  _id: string,
  username: string
}

export interface FriendRecordModel {
  selfId: string,
  friend: Friend,
  status: string
}
