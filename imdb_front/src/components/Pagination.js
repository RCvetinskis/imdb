import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, handlePageClick, pageParams }) => {
  return (
    <div className="custom-pagination-container">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="pagination-container"
        activeClassName="active"
        disabledClassName="disabled"
        initialPage={pageParams === 0 ? pageParams : pageParams - 1}
      />
    </div>
  );
};

export default Pagination;
