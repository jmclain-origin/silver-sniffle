import supertest from 'supertest'
import express from 'express'
import routes from '../index'
import errorHandler from '../../middleware/errorHandler'

const app = express()
app.use(express.json())
app.use('/api', routes)
app.use(errorHandler)

afterAll(() => {
  jest.restoreAllMocks()
})

describe('API Routes', () => {
  // it('should return 404 for unknown routes', async () => {
  //   const response = await supertest(app).get('/api/unknown-route')
  //   expect(response.status).toBe(404)
  //   expect(response.body).toHaveProperty('message', 'Not Found')
  // })

  // it('should handle POST requests to /logs correctly', async () => {
  //   const response = await supertest(app).post('/api/logs').send({ type: 'app', date: '2023-10-01' })
  //   expect(response.status).toBe(200)
  //   expect(response.body).toHaveProperty('message', 'Logs processed')
  // })

  it('should handle GET requests to /logs correctly', async () => {
    const response = await supertest(app).get('/api/logs?type=app&date=2024-07-12');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('logs');
  })

  it('should return 400 for missing query parameters in GET /logs', async () => {
    const response = await supertest(app).get('/api/logs')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Missing required query parameters')
  })
})
