import { ScoreResponse } from './../types/rating'
import { Rating, RatingPayload } from '@/types/rating'
import { client } from './client'

export const RatingService = {
  create(payload: RatingPayload): Promise<Rating> {
    return client.post('/rating/create', { ...payload })
  },
  detail(payload: RatingPayload): Promise<ScoreResponse> {
    return client.post('/rating/score', { ...payload })
  }
}
