import supertest from 'supertest'
import express from 'express'
import publicRoutes from '../public'
import errorHandler from '../../middleware/errorHandler'

const app = express()
app.use(express.json())
app.use('/public', publicRoutes)
app.use(errorHandler)

describe('Public Routes', () => {
  it('should return 200 OK for GET /public', async () => {
    const response = await supertest(app).get('/public')
    expect(response.status).toBe(200)
  })

  it('should return 404 Not Found for unknown route', async () => {
    const response = await supertest(app).get('/public/unknown')
    expect(response.status).toBe(404)
  })
})
