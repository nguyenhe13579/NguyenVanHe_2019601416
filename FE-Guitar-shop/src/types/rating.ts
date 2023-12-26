export type Rating = {
  id: number
  user_id: number
  product_id: number
  score: number
  created_at: string
  updated_at: string
}

export type RatingPayload = {
  user_id: number
  product_id: number
  score?: number
}

export type ScoreResponse = {
  score: string
  total: number
  rated: Rating[]
}
