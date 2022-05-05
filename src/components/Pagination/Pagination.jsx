import React, { useState } from 'react'
import "./pagination.scss";

const Pagination = ({linksPerPage, totalLinks, paginate}) => {
    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1);

    for (let i = 1; i<= Math.ceil(totalLinks / linksPerPage); i++){
        pageNumbers.push(i);
    }

const handleClick = number => {
    paginate(number);
    setCurrentPage(number);
}

  return (
    <nav>
        <ul data-testid="list-item" className='pagination'> 
            {pageNumbers.map(number => (
                <li key={number} data-testid="reyiz" className={`page-item ${number===currentPage ? "active" : ""}`}>
                    <span onClick={()=> handleClick(number)} className= "page-link" >
                        {number}
                    </span>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Pagination;
