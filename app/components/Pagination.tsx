import Icon from "./Icon"
import { useEffect } from "react"

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
}

export default function Pagination<T extends any[]>({
  data,
  offset,
  currentPage,
  setCurrentPage,
  pagesArray,
  setPagesArray,
  canGetNextPage,
  setCanGetNextPage,
  canGetPreviousPage,
  setCanGetPreviousPage,
}: PaginationProps<T>) {
  const totalPages = data.length / offset

  //controls the class that visually discourages the required page button from being clicked

  useEffect(() => {
    if (currentPage !== totalPages) {
      setCanGetNextPage(true)
    } else setCanGetNextPage(false)
    if (currentPage === 1) {
      setCanGetPreviousPage(true)
    } else setCanGetPreviousPage(false)
  }, [currentPage, totalPages])

  function getNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
      setPagesArray((prev) => [...prev, currentPage + 1])
    }
  }
  function getPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
      setPagesArray((prev) => [...prev, currentPage - 1])
    }
  }

  return (
    <footer>
      <aside>
        {/* The display of how many records out of the total are being shown */}
        <p className="currentPageNumber">
          Showing{" "}
          <span>
            {offset * currentPage}
            <Icon filename="np_next.svg" />
          </span>{" "}
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
            pagesArray
              .slice(currentPage, 4)
              .map((page) => <li key={page}>{page}</li>)
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
