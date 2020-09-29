import React from "react";
import styles from "./IssueList.module.css";
const IssueList = ({ issueList, handleShow }) => {
  return (
    <div className={styles.issueContainer}>
      {issueList.map((item) => (
        <div className={styles.issue}>
          <p>{item.number}</p>
      <p>comment: {item.comments}</p>
          <button type="button" onClick={() => handleShow(item.number)}>Show Issue</button>
        </div>
      ))}
    </div>
  );
};

export default IssueList;
