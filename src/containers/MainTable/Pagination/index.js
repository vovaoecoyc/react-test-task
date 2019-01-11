import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap'

import styles from './Pagination.module.css'

const Pagination = ({
  data,
  pageCount,
  match: {
    params: { pageID }
  }
}) => {
  let pages = []
  for (let i = 0; i < pageCount; ++i) {
    pages.push(
      <NavItem key={i} className={i + 1 === +pageID ? `${styles.currentPage}` : ''}>
        <NavLink tag={Link} to={`/page/${i + 1}`}>
          {i + 1}
        </NavLink>
      </NavItem>
    )
  }
  return <Nav className="justify-content-center">{pages}</Nav>
}

const PaginationWithRoute = withRouter(Pagination)

export { PaginationWithRoute }
