import React, { useState } from 'react';
import './App.css';
import './BlogCards.css';
import { isArrayEmpty as checkArrayEmpty } from './Utils';
import { Link } from 'react-router-dom';
import { blobArr, addBlog } from './blogData';

function BlogCards() {
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddBlogClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveBlog = () => {
    if (!title || !description) {
      alert('Title and description are required.');
      return;
    }
    const newId = Date.now(); // Generate a unique ID based on the current timestamp
    addBlog(newId, title, description);
    setTitle('');
    setDescription('');
    setShowPopup(false);
  };

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
      <button className="add-blog-button" onClick={handleAddBlogClick}>+ Create Blog</button>
      {blogCards}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Create New Blog</h2>
            <label>
              Title:
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
              Description:
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <button onClick={handleSaveBlog}>Save</button>
            <button onClick={handleClosePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogCards;