// Breadcrumb.js
import React from 'react';

const Breadcrumb = ({ currentPage }) => {
  return (
    <nav className=" ">
      <ol className="list-decimal pl-5">
        <li className="inline">
          <a href="/" className="text-blue-600 hover:text-blue-800">Home</a>
        </li>
        {currentPage && (
          <>
            <span className="mx-2">/</span>
            <li className="inline text-gray-700">{currentPage}</li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
