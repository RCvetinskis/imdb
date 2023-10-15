import React from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const Pagination = ({ pageCount, pathname }) => {
  const nav = useNavigate();
  const handlePageClick = (event) => {
    nav(`${pathname}?page=${event.selected + 1}`);
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
