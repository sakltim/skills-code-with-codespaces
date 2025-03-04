import React, { useState } from 'react';
import { addBlog } from './blogData';

function AddBlogPopup({ onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSave = () => {
        if (!title || !description) {
            setError('Title and description are required.');
            return;
        }
        const newId = Date.now(); // Generate a unique ID based on the current timestamp
        addBlog(newId, title, description);
        onClose();
    };

    return (
        <div className="add-blog-popup">
            <h2>Add Blog</h2>
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

export default AddBlogPopup;
