interface Friend {
  _id: string,
  name: string
}

export interface FriendRecordModel {
  selfId: string,
  friend: Friend,
  status: string
}
