import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './BlogCards.css';
import { isArrayEmpty as checkArrayEmpty } from './Utils';
import { Link } from 'react-router-dom';
import { blobArr, addBlog } from './blogData';
import { users } from './userData';
import formatDate from './utils/Helper';
import { blogCommentArr } from './blogCommentData';

function BlogCards() {
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  // const [userDetails, setUserDetails] = useState({ firstName: '', lastName: '', username: '' });


  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem('username');
  //   if (!loggedInUser) {
  //     navigate('/login');
  //   } else {
  //     const user = users.find(user => user.username === loggedInUser);
  //     if (user) {
  //       setUserDetails(user);
  //     }
  //   }
  // }, [navigate]);


  const handleAddBlogClick = () => {
    const loggedInUser = localStorage.getItem('username');
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setShowPopup(true);
    }
  };


  const userfullName = (username) => {
    const user = users.find(user => user.username === username);
    // const fullName = user ? `${user.firstName} ${user.lastName}` : username;
    return user ? `${user.firstName} ${user.lastName}` : username;
  };

  const getCommentCount = (blogId) => {
    const blogComment = blogCommentArr.filter(item => item.blogId === blogId);
    return blogComment ? blogComment.length : 0;
  };

  const handleClosePopup = () => {
    setTitle('');
    setDescription('');
    setShowPopup(false);
  };

  const handleSaveBlog = () => {
    if (!title || !description) {
      alert('Title and description are required.');
      return;
    }
    const newId = Date.now(); // Generate a unique ID based on the current timestamp
    const submittedTime = new Date().toISOString(); // Get the current date and time
    const loggedInUser = localStorage.getItem('username');
    const user = users.find(user => user.username === loggedInUser);
    addBlog(newId, title, description, user.username, submittedTime);
    setTitle('');
    setDescription('');
    setShowPopup(false);
  };

  const sortedBlobArr = [...blobArr].sort((a, b) => new Date(b.submittedTime) - new Date(a.submittedTime));

  const blogCards = checkArrayEmpty(sortedBlobArr) ? [] : sortedBlobArr.map((item, pos) => {
    return (
      <Link to={`/blog/${item.id}`} key={item.id} className="blog-card-link">
        <div className="blog-card">
          <h2 className="blog-card-title">{item.title} (Comments: {getCommentCount(item.id)})</h2>
          <div className="blog-card-header">
            <div className="modal-sub-header blog-card-user">
              <p>{userfullName(item.username)}</p>
              <p>{formatDate(item.submittedTime)}</p>
            </div>
          </div>
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
              <input type="text" value={title} maxLength={300} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
              Description:
              <textarea value={description} maxLength={5000} onChange={(e) => setDescription(e.target.value)} />
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