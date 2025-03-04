import React from 'react';
import './App.css';
import './BlogCards.css';
import { isArrayEmpty as checkArrayEmpty } from './Utils';
import { Link } from 'react-router-dom';
import { blobArr } from './blogData';
// import { useNavigate, Link } from 'react-router-dom';
// import { MyContext } from './DataTransferComponent/Parent';
// import React, {  useContext } from 'react';
// import Child from './DataTransferComponent/Child';

function BlogCards() {
  // const navigate = useNavigate();
  const blogCards = checkArrayEmpty(blobArr) ? [] : blobArr.map((item, pos) => {
    return (
      <Link to={`/blog/${item.id}`} key={item.id} className="blog-card-link">
        <div className="blog-card">
          <h2 className="blog-card-title">{item.title}</h2>
          <p className="blog-card-description">{item.description}</p>
        </div>
      </Link>
    );
  });

  return (
    <div className="blog-cards-container">
      {blogCards}
    </div>
  );
}

export default BlogCards;