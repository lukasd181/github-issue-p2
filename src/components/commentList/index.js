import React from 'react'
import styles from "./CommentList.module.css"
const CommentList = ({commentList}) => {
    return (
        <div>
            {commentList.map(comment => (
                <div className={styles.comment}>{comment.id}</div>
            ))}
        </div>
    )
}

export default CommentList
