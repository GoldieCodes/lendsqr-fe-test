import Icon from "@/app/components/Icon"
import { useEffect, useState } from "react"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md"

type PaginationProps<T extends any[]> = {
  data: T
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  offset: number
  pagesArray: number[]
  setPagesArray: React.Dispatch<React.SetStateAction<number[]>>
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
  rowsPerPage,
  setRowsPerPage,
  totalPages,
}: PaginationProps<T>) {
  //for the display on the input, but this is not being evaluated yet
  //the variable that sets the initial offset value is the rowsPerPage variable in the parent component
  const [offsetInput, setOffsetInput] = useState(rowsPerPage.toString())

  function getNextPage() {
    if (totalPages && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }
  function getPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
      setPagesArray((prev) => prev.slice(0, -1))
    }
  }
  //allow the user to enter the number of pages to show at a time
  function changeOffset(userSelection: string) {
    setRowsPerPage(parseInt(userSelection, 10))
    setCurrentPage(1)
    setPagesArray([1])
    setOffsetInput("") //will clear the display after the user has entered a value, so that the placeholder value can show
  }

  //will run just once and clear the input field
  useEffect(() => {
    setOffsetInput("") //clears the input value displayed so that the placeholder will be visible
  }, [])

  /******************************* THE JSX BEGINS ****************************************************/
  return (
    <footer>
      <aside>
        {/* The display of how many records out of the total are being shown */}
        <p className="currentPageNumber">
          Showing
          <select
            id="offsetValue"
            value={offsetInput}
            onChange={(e) => {
              if (e.target.value !== "") changeOffset(e.target.value)
            }}
          >
            <option value="">{rowsPerPage * currentPage}</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          out of {data.length} records.
        </p>
      </aside>

      {/* The pagination and controls display */}
      <nav>
        {/* the button to go to the previous page */}
        <span
          className={`previousPage ${currentPage === 1 ? "disabled" : "hover"}`}
          onClick={getPreviousPage}
        >
          <MdKeyboardArrowLeft />
        </span>

        {/* the page numbers */}
        <ul className="pages">
          {pagesArray.slice(0, 3).map((page) => (
            <li
              key={page}
              className={currentPage === page ? "currentPage" : ""}
            >
              {page}
            </li>
          ))}
          <li>...</li>
          {currentPage > 4 &&
            pagesArray.slice(currentPage - 1, currentPage + 1).map((page) => (
              <li
                key={page}
                className={currentPage === page ? "currentPage" : ""}
              >
                {page}
              </li>
            ))}
        </ul>
        {/* the button to go to the next page */}

        <span
          className={`nextPage ${
            currentPage === totalPages ? "disabled" : "hover"
          }`}
          onClick={getNextPage}
        >
          <MdKeyboardArrowRight />
        </span>
      </nav>
    </footer>
  )
}
