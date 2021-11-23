import React, { Component } from "react";
import classes from "./Pages/Event/event.module.css";

class pagination extends Component {
  render() {
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.totalPosts / this.props.postsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    return (
      <>
        <ul className={classes.Pagination}>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={classes.Paginationitem}
              onClick={() => this.props.paginate(number)}
            >
              <label>{number}</label>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default pagination;
