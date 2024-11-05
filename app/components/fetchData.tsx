// The following functions fetch data from localStorage or an API and paginate the given data

/**
 * Checks localStorage for stored data and its timestamp.
 * Data is considered stale after 24 hours.
 *
 * @param storedDataKey - The key for the stored data in localStorage.
 * @param storedTimeKey - The key for the stored timestamp in localStorage.
 * @returns Parsed data from localStorage or null if data is stale or not found.
 */
export function checkStorageData(storedDataKey: string, storedTimeKey: string) {
  // Data is considered stale after 24 hours (converted to milliseconds)
  const dataExpiryInterval = 24 * 60 * 60 * 1000

  // First check for data from localStorage
  const storedData = localStorage.getItem(storedDataKey)
  const storedTime = localStorage.getItem(storedTimeKey)

  if (storedData && storedTime) {
    const parsedData: [] = JSON.parse(storedData)
    const parsedTime = parseInt(storedTime, 10)
    const timeRightNow = Date.now()

    // Check if the interval has been exceeded; if not, return the data
    if (timeRightNow - parsedTime < dataExpiryInterval) return parsedData
  }

  return null // Return null if no valid data is found
}

/**
 * Fetches data from an API and stores it in localStorage.
 *
 * @param api - The API endpoint to fetch data from.
 * @param dataStorageKey - The key for storing the data in localStorage.
 * @param timeStorageKey - The key for storing the timestamp in localStorage.
 * @returns Fetched data or null if the fetch failed.
 */
export async function fetchApiData(
  api: string,
  dataStorageKey: string,
  timeStorageKey: string
): Promise<[] | null> {
  const response = await fetch(api)

  if (response.ok) {
    const data = await response.json()
    const timeStamp = Date.now()

    // Store the fetched data and timestamp in localStorage
    localStorage.setItem(dataStorageKey, JSON.stringify(data))
    localStorage.setItem(timeStorageKey, timeStamp.toString())

    return data // Return the fetched data
  }

  return null // Return null if the fetch fails
}

/**
 * Paginates the given data based on the current page and rows per page.
 *
 * @param data - The data to paginate.
 * @param dataRowsPerPage - The number of rows to display per page.
 * @param currentPage - The current page number.
 * @returns A slice of the data for the current page or null if data is invalid.
 */
export function PaginateData(
  data: [] | null,
  dataRowsPerPage: number,
  currentPage: number
) {
  if (data) {
    const dataSize = data.length
    const totalPages = Math.ceil(dataSize / dataRowsPerPage)

    // Calculate the starting and ending indices for slicing the data
    const singleDataPage = data.slice(
      (currentPage - 1) * dataRowsPerPage,
      currentPage * dataRowsPerPage
    )

    return singleDataPage // Return the paginated data for the current page
  }

  return null // Return null if no data is provided
}
