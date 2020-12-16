import React from "react";
import { connect } from "react-redux";

const Pagination = ({ personsPerPage, total, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / personsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination pagination-lg">
        {pageNumbers.map((number, i) => (
          <li className="page-item " key={number}>
            <a
              className={
                i + 1 == currentPage ? "active page-link" : "page-link"
              }
              onClick={() => paginate(number)}
              href="#"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  users: state.users.items,
});

export default connect(mapStateToProps)(Pagination);
