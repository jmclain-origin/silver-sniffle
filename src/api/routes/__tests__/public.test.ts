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

  it('should return 400 Bad Request for invalid query parameters', async () => {
    const response = await supertest(app).get('/public?invalidParam=true')
    expect(response.status).toBe(400)
  })

  it('should return 500 Internal Server Error for server errors', async () => {
    app.get('/public/error', (req, res) => {
      throw new Error('Test error')
    })
    const response = await supertest(app).get('/public/error')
    expect(response.status).toBe(500)
  })
})
