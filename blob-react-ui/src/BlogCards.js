import React from 'react';
import './App.css';
import BlogCard from './BlogCard';
import { isArrayEmpty as checkArrayEmpty } from './Utils';
import { useNavigate } from 'react-router-dom';
// import { MyContext } from './DataTransferComponent/Parent';
// import React, {  useContext } from 'react';
// import Child from './DataTransferComponent/Child';

function BlogCards() {
  const blobArr = [
    { id: 1, title: 'Title 1', description: 'Text Paragraph 1, Text Paragraph Text Paragraph Text Paragraph Text Paragraph' },
    { id: 2, title: 'Title 2', description: 'Text Paragraph 2, Text Paragraph Text Paragraph Text Paragraph Text Paragraph' },
    { id: 3, title: 'Title 3', description: 'Text Paragraph 3, Text Paragraph Text Paragraph Text Paragraph Text Paragraph' }
  ];

  const navigate = useNavigate();

  // const handleLogout = () => {
  //   navigate('/');
  // };

  const blogCards = checkArrayEmpty(blobArr) ? [] : blobArr.map((item, pos) => {
    return (<BlogCard title={item.title} description={item.description} id={item.id} key={item.id} />)
  });
  // const value = useContext(MyContext);
  return (
    <div>
      {/* <div>MyContext Value - <Child /></div> */}
      <div>
        {/* <div>
          <button onClick={handleLogout}>Logout</button>
        </div> */}
        <div>
          {blogCards}
        </div>
      </div>
    </div>
  );
}

export default BlogCards;
