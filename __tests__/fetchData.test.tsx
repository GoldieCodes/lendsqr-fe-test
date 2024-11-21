import { checkStorageData, fetchApiData } from "../app/components/fetchData"
import "@testing-library/jest-dom"

// Create proper mock implementation for localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {}
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString()
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      store = {}
    }),
  }
})()

beforeAll(() => {
  // Assign the mock to global.localStorage
  Object.defineProperty(global, "localStorage", {
    value: localStorageMock,
    writable: true,
  })
})

beforeEach(() => {
  // Clear all mocks and reset localStorage
  jest.clearAllMocks()
  localStorage.clear()
})

describe("test that data fetching from localStorage works as expected", () => {
  const mockStoredDataKey = "testDataKey"
  const mockStoredTimeKey = "testTimeKey"

  test("checkStorageData: returns parsed data if data is fresh", () => {
    const freshData = JSON.stringify([{ data: "some fresh data" }])
    const freshTimestamp = Date.now()
    localStorage.setItem(mockStoredDataKey, freshData)
    localStorage.setItem(mockStoredTimeKey, freshTimestamp.toString())

    const result = checkStorageData(mockStoredDataKey, mockStoredTimeKey)
    expect(result).toEqual([{ data: "some fresh data" }])
  })

  test("returns null if data is stale", () => {
    const staleData = JSON.stringify([{ data: "some stale data" }])
    const staleTimestamp = Date.now() - 25 * 60 * 60 * 1000 // 25 hours ago
    localStorage.setItem(mockStoredDataKey, staleData)
    localStorage.setItem(mockStoredTimeKey, staleTimestamp.toString())

    const result = checkStorageData(mockStoredDataKey, mockStoredTimeKey)
    expect(result).toBeNull()
  })
})

describe("fetchApiData", () => {
  const mockFetch = jest.fn()
  global.fetch = mockFetch
  const mockUrl = "https://api.example.com/data"
  const mockDataStorageKey = "mockDataKey"
  const mockTimeStorageKey = "mockTimeKey"

  test("stores data in localStorage on successful API call", async () => {
    const mockResponse = [{ id: 1 }, { id: 2 }]
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
      ok: true,
    })

    await fetchApiData(mockUrl, mockDataStorageKey, mockTimeStorageKey)

    expect(localStorage.setItem).toHaveBeenCalledWith(
      mockDataStorageKey,
      JSON.stringify(mockResponse)
    )
  })

  test("returns null on failed API call", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    })

    const result = await fetchApiData(
      mockUrl,
      mockDataStorageKey,
      mockTimeStorageKey
    )
    expect(result).toBeNull()
    expect(mockFetch).toHaveBeenCalledWith(mockUrl)
    expect(localStorage.setItem).not.toHaveBeenCalled()
  })
})
