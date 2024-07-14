import supertest from 'supertest'
import express from 'express'
import routes from '../index'
import errorHandler from '../../middleware/errorHandler'
import moment from 'moment';

const app = express()
app.use(express.json())
app.use('/api', routes)
app.use(errorHandler)

afterAll(() => {
  jest.clearAllMocks()
})

describe('API Routes', () => {

  it('should handle GET requests to /logs correctly', async () => {
    const date = moment().format('YYYY-MM-DD')
    const response = await supertest(app).get(`/api/logs?type=app&date=${date}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('logs');
  })

  it('should return 400 for missing query parameters in GET /logs', async () => {
    const response = await supertest(app).get('/api/logs')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Missing required query parameters')
  })
})
describe('Health Check Route', () => {
  it('should return 200 for health check', async () => {
    const response = await supertest(app).get('/api/health-check')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'OK')
  })

  it('should return JSON response for health check', async () => {
    const response = await supertest(app).get('/api/health-check')
    expect(response.headers['content-type']).toMatch(/json/)
  })

  it('should handle unexpected errors gracefully', async () => {
    const response = await supertest(app).get('/api/health-check?simulateError=true')
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message', 'Simulated Error')
  })
})
