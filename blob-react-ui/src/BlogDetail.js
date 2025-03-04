import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blobArr } from './blogData';
import { blogCommentArr } from './blogCommentData';
import { users } from './userData';
import './BlogDetail.css';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [userDetails, setUserDetails] = useState({ firstName: '', lastName: '', username: '' });

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    if (!loggedInUser) {
      navigate('/');
    } else {
      const user = users.find(user => user.username === loggedInUser);
      if (user) {
        setUserDetails(user);
      }
    }
  }, [navigate]);

  const blog = blobArr.find(blog => blog.id === parseInt(id));
  const comments = blogCommentArr.filter(comment => comment.blogId === parseInt(id));

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      alert('Comment cannot be empty or contain only spaces.');
      return;
    }

    const newCommentObj = {
      id: blogCommentArr.length + 1,
      blogId: blog.id,
      username: userDetails.username,
      submittedTime: new Date().toISOString(),
      comment: newComment
    };
    blogCommentArr.push(newCommentObj);
    setNewComment('');
    setShowModal(false);
  };

  const handleClearComment = () => {
    setNewComment('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="blog-detail">
      <div className="title-box">
        <h1>{blog.title}</h1>
      </div>
      <div className="description-box">
        <p>{blog.description}</p>
      </div>
      <div className="comments-section">
        <div className="comments-header">
          <h2>Comments</h2>
          <button className="add-comment-button" onClick={() => setShowModal(true)}>+</button>
        </div>
        {comments.length > 0 ? (
          comments.map(comment => {
            const user = users.find(user => user.username === comment.username);
            const fullName = user ? `${user.firstName} ${user.lastName}` : comment.username;
            return (
              <div key={comment.id} className="comment-box">
                <div className="comment-title">
                  <span className="comment-username">{fullName}</span>
                  <span className="comment-time">{comment.submittedTime}</span>
                </div>
                <div className="comment-text">{comment.comment}</div>
              </div>
            );
          })
        ) : (
          <p>No comments yet, be the first to add a comment.</p>
        )}
      </div>
      <button className="back-button" onClick={() => navigate('/BlogCards')}>
        Back to Blog List
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add Comment</h2>
              {/* <button className="close-button" onClick={handleCloseModal}>×</button> */}
            </div>
            <div className="modal-sub-header">
              <h3>{blog.title}</h3>
              <span>{`${userDetails.firstName} ${userDetails.lastName} (${userDetails.username})`}</span>
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
            />
            <div className="modal-footer">
              <button onClick={handleAddComment}>Add Comment</button>
              <button onClick={handleClearComment}>Clear</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogDetail;