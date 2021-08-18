export interface Game {
  _id: string,
  name: string,
  description: string,
  price: number,
  tags: string[],
  addedToCurrentUser: boolean
}
