import { pwd } from '../paths'
import childProcess from 'child_process'

jest.mock('child_process')

describe('pwd function', () => {
  it('should return the current working directory as a string', () => {
    const mockStdout = {
      once: jest.fn((event, callback) => {
        callback(null, Buffer.from('/mocked/path'))
        return mockStdout
      }),
    }
    const mockSpawn = {
      stdout: mockStdout,
      toString: jest.fn(() => '/mocked/path'),
    };

    (childProcess.spawn as jest.Mock).mockReturnValue(mockSpawn)

    const result = pwd()
    expect(result).toBe('/mocked/path')
  })

  it('should throw an error if there is an error in the child process', () => {
    const mockStdout = {
      once: jest.fn((event, callback) => {
        callback(new Error('Mocked error'), null)
        return mockStdout
      }),
    }
    const mockSpawn = {
      stdout: mockStdout,
      toString: jest.fn(),
    };

    (childProcess.spawn as jest.Mock).mockReturnValue(mockSpawn)

    expect(() => pwd()).toThrow('Mocked error')
  })

  it('should return null if the child process returns null', () => {
    const mockStdout = {
      once: jest.fn((event, callback) => {
        callback(null, null)
        return mockStdout
      }),
    }
    const mockSpawn = {
      stdout: mockStdout,
      toString: jest.fn(() => null),
    };

    (childProcess.spawn as jest.Mock).mockReturnValue(mockSpawn)

    const result = pwd()
    expect(result).toBe(null)
  })

  it('should return undefined if the child process returns undefined', () => {
    const mockStdout = {
      once: jest.fn((event, callback) => {
        callback(null, undefined)
        return mockStdout
      }),
    }
    const mockSpawn = {
      stdout: mockStdout,
      toString: jest.fn(() => undefined),
    };

    (childProcess.spawn as jest.Mock).mockReturnValue(mockSpawn)

    const result = pwd()
    expect(result).toBe(undefined)
  })

  it('should handle unexpected data types gracefully', () => {
    const mockStdout = {
      once: jest.fn((event, callback) => {
        callback(null, 12345)
        return mockStdout
      }),
    }
    const mockSpawn = {
      stdout: mockStdout,
      toString: jest.fn(() => '12345'),
    };

    (childProcess.spawn as jest.Mock).mockReturnValue(mockSpawn)

    const result = pwd()
    expect(result).toBe('12345')
  })
})
