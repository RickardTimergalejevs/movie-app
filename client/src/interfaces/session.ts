export interface ISeat {
  isBooked: boolean
  seat: string
  _id: string
}

export interface IRow {
  row: string
  seats: ISeat[]
  _id: string
}

export interface ITicket {
  _id: string
  price: number
  type: string
}

export interface ISession {
  _id: string
  movieId: string
  city: string
  showDate: string
  showTime: string
  displayType: string
  hall: {
    _id: string
    name: string
    capacity: number
    rows: IRow[]
  }
  tickets: ITicket[]
}
