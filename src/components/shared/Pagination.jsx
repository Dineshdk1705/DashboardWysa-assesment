/* eslint-disable react/prop-types */
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Pagination = ({
  currentPage = 1,
  totalPageCount,
  setCurrentPage,
  enableColor,
  disableColor,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPageCount) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  return (
    <div className="flex flex-nowrap gap-3 justify-center">
      <GrFormPrevious
        size={27}
        className={`border-[1px] rounded-md ${
          currentPage > 1
            ? `border-[${enableColor}] cursor-pointer`
            : `cursor-not-allowed border-[${disableColor}]`
        }  `}
        onClick={handlePrev}
        color={currentPage > 1 ? enableColor : disableColor}
      />
      {currentPage} / {totalPageCount}
      <GrFormNext
        size={27}
        className={`border-[1px] rounded-md  ${
          currentPage < totalPageCount
            ? `border-[${enableColor}] cursor-pointer`
            : `cursor-not-allowed border-[${disableColor}]`
        }`}
        onClick={handleNext}
        color={currentPage < totalPageCount ? enableColor : disableColor}
      />
    </div>
  );
};

export default Pagination;
