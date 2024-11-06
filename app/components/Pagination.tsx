import Icon from "./Icon"
import { useEffect, useState } from "react"

type PaginationProps<T extends any[]> = {
  data: T
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  offset: number
  pagesArray: number[]
  setPagesArray: React.Dispatch<React.SetStateAction<number[]>>
  canGetNextPage: boolean
  setCanGetNextPage: React.Dispatch<React.SetStateAction<boolean>>
  canGetPreviousPage: boolean
  setCanGetPreviousPage: React.Dispatch<React.SetStateAction<boolean>>
  rowsPerPage: number
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number | null
}

export default function Pagination<T extends any[]>({
  data,
  currentPage,
  setCurrentPage,
  pagesArray,
  setPagesArray,
  canGetNextPage,
  setCanGetNextPage,
  canGetPreviousPage,
  setCanGetPreviousPage,
  rowsPerPage,
  setRowsPerPage,
  totalPages,
}: PaginationProps<T>) {
  //for the display on the input, but this is not being evaluated yet
  //the variable that sets the initial offset value is the rowsPerPage variable in the parent component
  const [offsetInput, setOffsetInput] = useState(rowsPerPage.toString())

  //controls the class that visually discourages the required page button from being clicked

  useEffect(() => {
    if (totalPages && currentPage !== totalPages) {
      setCanGetNextPage(true)
    } else setCanGetNextPage(false)
    if (currentPage === 1) {
      setCanGetPreviousPage(false)
    } else setCanGetPreviousPage(true)
  }, [currentPage, totalPages, rowsPerPage])

  function getNextPage() {
    if (totalPages && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
      setPagesArray((prev) => [...prev, currentPage + 1])
    }
  }
  function getPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
      setPagesArray((prev) => prev.slice(0, -1))
    }
  }
  //allow the user to enter the number of pages to show at a time
  function changeOffset() {
    const inputValueForNumberOfPagesShown = parseInt(offsetInput, 10)
    if (
      inputValueForNumberOfPagesShown < data.length &&
      inputValueForNumberOfPagesShown > 0
    )
      setRowsPerPage(inputValueForNumberOfPagesShown)
    setCurrentPage(1)
    setPagesArray([1])
  }

  function changeOffsetOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      changeOffset()
    }
  }

  return (
    <footer>
      <aside>
        {/* The display of how many records out of the total are being shown */}
        <p className="currentPageNumber">
          Showing
          <span>
            <input
              type="text"
              id="offsetValue"
              placeholder={(rowsPerPage * currentPage).toString()}
              value={offsetInput}
              onChange={(e) => setOffsetInput(e.target.value)}
              onKeyDown={(e) => changeOffsetOnKeyDown(e)}
            />

            <Icon filename="np_next.svg" onClick={changeOffset} />
          </span>
          out of {data.length}
        </p>
      </aside>

      {/* The pagination and controls display */}
      <nav>
        {/* the button to go to the previous page */}
        <Icon
          filename="np_next.svg"
          className={`previousPage ${
            canGetPreviousPage ? "hover" : "disabled"
          }`}
          onClick={getPreviousPage}
        />

        {/* the page numbers */}
        <ul className="pages">
          {pagesArray.length === 1 ? (
            <li>{pagesArray[0]}</li>
          ) : pagesArray.length <= 3 && pagesArray.length > 1 ? (
            pagesArray.map((page) => <li key={page}>{page}</li>)
          ) : (
            pagesArray.slice(0, 3).map((page) => <li key={page}>{page}</li>)
          )}

          <li>...</li>
          {pagesArray.length > 4
            ? pagesArray
                .slice(pagesArray.length - 2)
                .map((page) => <li key={page}>{page}</li>)
            : null}
        </ul>
        {/* the button to go to the next page */}
        <Icon
          filename="np_next.svg"
          className={`nextPage ${canGetNextPage ? "hover" : "disabled"}`}
          onClick={getNextPage}
        />
      </nav>
    </footer>
  )
}
