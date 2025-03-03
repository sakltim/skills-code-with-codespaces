import React from "react";
import classes from './BlogCard.module.css';

const BlogCard = (props) => {
    return (
        <div className={classes.BlogCard}>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    );
}

export default BlogCard;