import React from "react";

const Pagination = ({ jobsPerPage, totalPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPage / jobsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav aria-label="Page navigation">
        <ul className="pagination  justify-content-center ">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item px-1">
              <a
                style={{ borderRadius: "20%", color: "#343a40" }}
                onClick={() => paginate(number)}
                href="#page"
                className="page-link"
              >
                {number}{" "}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
