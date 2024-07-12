import { sum } from '../sum'

describe('sum function', () => {
  it('should return the sum of two positive numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })

  it('should return the sum of two negative numbers', () => {
    expect(sum(-1, -2)).toBe(-3)
  })

  it('should return the sum of a positive and a negative number', () => {
    expect(sum(1, -2)).toBe(-1)
  })

  it('should return the sum of zero and a number', () => {
    expect(sum(0, 5)).toBe(5)
  })

  it('should return the sum of two zeros', () => {
    expect(sum(0, 0)).toBe(0)
  })

  it('should handle large numbers correctly', () => {
    expect(sum(1000000, 2000000)).toBe(3000000)
  })
})
