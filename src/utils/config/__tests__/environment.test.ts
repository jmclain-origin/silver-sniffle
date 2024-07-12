import { config } from 'dotenv'
import environment from '../environment'

config()

describe('Environment Configuration', () => {
  it('should return default values when environment variables are not set', () => {
    const env = environment()
    expect(env.PORT).toBe('8080')
    expect(env.DB_URI).toBe('mongodb://localhost:27017/test')
    expect(env.JWT_SECRET).toBe('JWT_SECRET')
    expect(env.AWS_ACCESS_KEY).toBe('AWS_ACCESS_KEY')
    expect(env.AWS_SECRET_KEY).toBe('AWS_SECRET_KEY')
    expect(env.AWS_REGION).toBe('AWS_REGION')
    expect(env.AWS_BUCKET).toBe('AWS_BUCKET')
  })

  it('should return environment variable values when they are set', () => {
    process.env.PORT = '3000'
    process.env.MONGODB_URI = 'mongodb://localhost:27017/production'
    process.env.JWT_SECRET = 'mysecret'
    process.env.AWS_ACCESS_KEY = 'myaccesskey'
    process.env.AWS_SECRET_KEY = 'mysecretkey'
    process.env.AWS_REGION = 'us-west-2'
    process.env.AWS_BUCKET = 'mybucket'

    const env = environment()
    expect(env.PORT).toBe('3000')
    expect(env.DB_URI).toBe('mongodb://localhost:27017/production')
    expect(env.JWT_SECRET).toBe('mysecret')
    expect(env.AWS_ACCESS_KEY).toBe('myaccesskey')
    expect(env.AWS_SECRET_KEY).toBe('mysecretkey')
    expect(env.AWS_REGION).toBe('us-west-2')
    expect(env.AWS_BUCKET).toBe('mybucket')
  })

  it('should handle missing optional environment variables gracefully', () => {
    delete process.env.PORT
    delete process.env.MONGODB_URI
    delete process.env.JWT_SECRET
    delete process.env.AWS_ACCESS_KEY
    delete process.env.AWS_SECRET_KEY
    delete process.env.AWS_REGION
    delete process.env.AWS_BUCKET

    const env = environment()
    expect(env.PORT).toBe('8080')
    expect(env.DB_URI).toBe('mongodb://localhost:27017/test')
    expect(env.JWT_SECRET).toBe('JWT_SECRET')
    expect(env.AWS_ACCESS_KEY).toBe('AWS_ACCESS_KEY')
    expect(env.AWS_SECRET_KEY).toBe('AWS_SECRET_KEY')
    expect(env.AWS_REGION).toBe('AWS_REGION')
    expect(env.AWS_BUCKET).toBe('AWS_BUCKET')
  })
})
