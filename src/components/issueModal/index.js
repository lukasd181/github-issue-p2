import React from "react";
import { Modal, Button } from "react-bootstrap";
import CommentList from "../commentList"
import styles from "./IssueModal.module.css"
const IssueModal = ({handleClose, showModal, commentList, displayCommentBut}) => {
  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
            <div className={styles.commentSection}>
            <CommentList commentList={commentList}/>
            
          {displayCommentBut && <Button variant="primary" onClick={handleClose}>
            Show More
          </Button> }
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IssueModal;
