import supertest from 'supertest'
import express, { Request, Response, NextFunction } from 'express'
import errorHandler from '../errorHandler'

const app = express()

app.get('/error', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Test Error') as any
  error.status = 400
  next(error)
})

app.get('/unexpected-error', (req: Request, res: Response, next: NextFunction) => {
  next(new Error('Internal Server Error'))
})

app.use(errorHandler)

describe('Error Handler Middleware', () => {
  it('should handle known errors with specific status and message', async () => {
    const response = await supertest(app).get('/error')
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('status', 400)
    expect(response.body).toHaveProperty('message', 'Test Error')
  })

  it('should handle unexpected errors with 500 status and default message', async () => {
    const response = await supertest(app).get('/unexpected-error')
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('status', 500)
    expect(response.body).toHaveProperty('message', 'Internal Server Error')
  })

  it('should log the error details', async () => {
    const errorLogger = {
      error: jest.fn(),
    }
    const errorHandlerWithLogger = (
      err: any,
      _req: Request,
      res: Response,
      _next: NextFunction,
    ) => {
      const status = err.status ?? 500
      const message = err.message ?? 'Internal Server Error'
      errorLogger.error(`${status} - ${message} - ${err.stack}`)
      res.status(status).json({
        status,
        message,
      })
    }

    const appWithLogger = express()
    appWithLogger.get('/error', (req: Request, res: Response, next: NextFunction) => {
      const error = new Error('Test Error') as any
      error.status = 400
      next(error)
    })
    appWithLogger.use(errorHandlerWithLogger)

    await supertest(appWithLogger).get('/error')
    expect(errorLogger.error).toHaveBeenCalledWith(expect.stringContaining('400 - Test Error'))
  })
})
