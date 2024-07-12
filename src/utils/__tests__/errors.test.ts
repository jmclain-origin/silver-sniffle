import { HttpError, ValidationError, DatabaseError, AuthenticationError, AuthorizationError, ThirdPartyServiceError, FileSystemError } from '../errors'

describe('Error Classes', () => {
  describe('HttpError', () => {
    it('should create an instance of HttpError with correct status and message', () => {
      const error = new HttpError(404, 'Not Found')
      expect(error).toBeInstanceOf(HttpError)
      expect(error.status).toBe(404)
      expect(error.message).toBe('Not Found')
      expect(error.name).toBe('HttpError')
    })
  })

  describe('ValidationError', () => {
    it('should create an instance of ValidationError with correct status and message', () => {
      const error = new ValidationError('Invalid input')
      expect(error).toBeInstanceOf(ValidationError)
      expect(error.status).toBe(400)
      expect(error.message).toBe('Invalid input')
      expect(error.name).toBe('ValidationError')
    })
  })

  describe('DatabaseError', () => {
    it('should create an instance of DatabaseError with correct status and message', () => {
      const error = new DatabaseError('Database connection failed')
      expect(error).toBeInstanceOf(DatabaseError)
      expect(error.status).toBe(500)
      expect(error.message).toBe('Database connection failed')
      expect(error.name).toBe('DatabaseError')
    })
  })

  describe('AuthenticationError', () => {
    it('should create an instance of AuthenticationError with correct status and message', () => {
      const error = new AuthenticationError('Authentication required')
      expect(error).toBeInstanceOf(AuthenticationError)
      expect(error.status).toBe(401)
      expect(error.message).toBe('Authentication required')
      expect(error.name).toBe('AuthenticationError')
    })
  })

  describe('AuthorizationError', () => {
    it('should create an instance of AuthorizationError with correct status and message', () => {
      const error = new AuthorizationError('Access denied')
      expect(error).toBeInstanceOf(AuthorizationError)
      expect(error.status).toBe(403)
      expect(error.message).toBe('Access denied')
      expect(error.name).toBe('AuthorizationError')
    })
  })

  describe('ThirdPartyServiceError', () => {
    it('should create an instance of ThirdPartyServiceError with correct status and message', () => {
      const error = new ThirdPartyServiceError('Third party service failed')
      expect(error).toBeInstanceOf(ThirdPartyServiceError)
      expect(error.status).toBe(502)
      expect(error.message).toBe('Third party service failed')
      expect(error.name).toBe('ThirdPartyServiceError')
    })
  })
})
describe('FileSystemError', () => {
  it('should create an instance of FileSystemError with correct message and path', () => {
    const error = new FileSystemError('File not found', '/path/to/file')
    expect(error).toBeInstanceOf(FileSystemError)
    expect(error.message).toBe('File not found')
    expect(error.path).toBe('/path/to/file')
    expect(error.name).toBe('FileSystemError')
  })

  it('should create an instance of FileSystemError with correct message and undefined path', () => {
    const error = new FileSystemError('File not found')
    expect(error).toBeInstanceOf(FileSystemError)
    expect(error.message).toBe('File not found')
    expect(error.path).toBeUndefined()
    expect(error.name).toBe('FileSystemError')
  })

  it('should have a name property set to "FileSystemError"', () => {
    const error = new FileSystemError('File system error')
    expect(error.name).toBe('FileSystemError')
  })
})
