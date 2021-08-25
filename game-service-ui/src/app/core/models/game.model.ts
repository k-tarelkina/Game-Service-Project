export interface GameModel {
  _id: string,
  name: string,
  description: string,
  price: number,
  tags: string[],
  picture?: string,
  addedToCurrentUser: boolean
}
