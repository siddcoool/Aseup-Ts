import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Input, Progress } from "@chakra-ui/react";
import  { ChangeEvent, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import WithCondition from "./WithCondition";
type IPagination = {
  totalPages: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  initialPage: number
  isLoading?: boolean
};

export const NativePagination = ({
  currentPage,
  totalPages,
}: any) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      // onPageChange(page);
    }
  };

  return (
    <div className="mt-4 flex justify-center">
      <nav aria-label="Pagination">
        <ul className="pagination flex">
          <li className="page-item">
            <Button
              colorScheme="blue"
              className={`${currentPage === 1 ? "disabled" : "hover:bg-gray-200"
                } rounded-l px-4 py-2`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ArrowBackIcon />
            </Button>
          </li>
          <div className="flex gap-x-4 px-4">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <li
                  key={page}
                  className={`${currentPage === page
                    ? "bg-blue-500 shadow-md"
                    : "hover:bg-gray-200"
                    } page-item`}
                >
                  <button
                    className="px-4 py-2"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ),
            )}
          </div>

          <li className="page-item">
            <Button
              colorScheme="blue"
              className={`${currentPage === totalPages ? "disabled" : "hover:bg-gray-200"
                } rounded-r px-4 py-2`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ArrowForwardIcon />
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export const Pagination = ({ totalPages, onPageChange, initialPage, isLoading }: IPagination) => {
  const [input, setInput] = useState(0)

  useEffect(() => {
    setInput(initialPage + 1)
  }, [initialPage])

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(parseInt(e.target.value))
  }

  const isDisabled = () => {
    const value = input - 1

    if (value >= totalPages) return true

    if (value < 0) return true

  }

  const handleGoto = () => {
    if (isDisabled()) return

    const value = input - 1

    if (value === initialPage) return

    onPageChange({ selected: value })
  }

  if(totalPages <= 1) return <></>

  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <div className="w-full flex flex-col items-center">
          <WithCondition condition={!!isLoading}>
            <div className="w-2/5 mt-2 ">
              <Progress size='xs' isIndeterminate className="mb-4" />
            </div>
          </WithCondition>
        </div>
        <ReactPaginate
          breakLabel="..."
          className="flex gap-x-4 justify-center  my-4"
          pageClassName=' text-center py-2 px-4'
          previousClassName='border-2 rounded-lg bg-primary text-white text-center p-2 px-4 uppercase'
          nextClassName='border-2 rounded-lg bg-primary text-white text-center p-2 px-4 uppercase'
          nextLabel=">"
          onPageChange={onPageChange}
          activeClassName='shadow-xl border-2  rounded-md'
          pageRangeDisplayed={2}
          pageCount={totalPages}
          initialPage={initialPage}
          previousLabel="<"
          renderOnZeroPageCount={null}
          forcePage={initialPage}
        />
        <div className="flex justify-center 4">
          <div className="flex gap-x-2">
            <Input type="number" placeholder="Go to page" width={28} onChange={handleInput} value={input} min={1} max={totalPages} />
            <Button colorScheme="facebook" onClick={handleGoto} isDisabled={isDisabled()}>Go</Button>
          </div>
        </div>

      </div>
    </div>
  );
};
