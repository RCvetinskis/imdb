import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, setData, setAPICall }) => {
  const handlePageClick = (event) => {
    setAPICall(event.selected + 1, setData);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
