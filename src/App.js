import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

import SearchBar from "./components/searchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "react-js-pagination";
import IssueList from "./components/IssueList";
import IssueModal from "./components/issueModal";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [repo, setRepo] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(null);
  const [issueList, setIssueList] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [issueNumber, setIssueNumber] = useState(null);
  const [commentPageNum, setCommentPageNum] = useState(1);
  const [commentList, setCommentList] = useState([]);
  const [commentTotalPage, setCommentTotalPage] = useState(null);
  const [loadingComment, setLoadingComment] = useState(false);
  const [commentURL, setCommentURL] = useState(null);
  const [displayCommentBut, setDisplayCommentBut] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = (issueNum) => {
    setShowModal(true);
    createCommentURL(issueNum);
  };

  const getRepoOwner = () => {
    setDefault();
    let owner = keyword.split("/")[0];
    let repo = keyword.split("/")[1];
    if (repo == null || owner == null) {
      setError("INVALID KEYWORD");
    }
    return { owner, repo };
  };

  const handleSubmission = () => {
    let { owner, repo } = getRepoOwner();
    setOwner(owner);
    setRepo(repo);
  };
  const setDefault = () => {
    setError(null);
    setPageNum(1);
  };

  const fetchIssue = async () => {
    try {
      setLoading(true);
      let url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNum}`;
      let response = await fetch(url);

      if (response.status === 200) {
        let data = await response.json();
        console.log("data", data);
        setIssueList(data);
        let link = response.headers.get("link");
        if (link) {
          const totalPage = link.match(/page=(\d+)>; rel="last"/);
          if (totalPage) {
            console.log("totalPage", totalPage[1]);
            setTotalPageNum(parseInt(totalPage[1]));
          }
        }
        setLoading(false);
      } else {
        setError("API PROBLEM");
        setLoading(false);
      }
    } catch (err) {
      setError("ERROR--", err.message);
    }
  };

  const createCommentURL = (issueNum) => {
    let url = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNum}/comments?page=${commentPageNum}&per_page=5`;

    setCommentURL(url);
    setIssueNumber(issueNum);
    setCommentList([]);
  };

  const fetchComment = async () => {
    try {
      setLoadingComment(true);
      let url = commentURL;
      console.log("rrr", url);
      const response = await fetch(url);
      if (response.status == 200) {
        const data = await response.json();
        setCommentList([...commentList, ...data]);
        console.log("COMMENT data", data);
        const link = response.headers.get("link");
        if (link) {
          const totalComment = link.match(
            /page=(\d+)&per_page=\d+>; rel="last"/
          );
          setCommentTotalPage(parseInt(totalComment[1]));
          console.log("totalCOM page", parseInt(totalComment[1]));
        } else {
          setCommentTotalPage(1);
        }
        setLoadingComment(false);
      } else {
        setError("COMMENT-- API PROBLEM");
        setShowModal(false);
      }
    } catch (err) {
      setError("COMMENT ERROR", err.message);
    }
  };


  useEffect(() => {
    if (commentURL == null) return;
    fetchComment();
  }, [commentURL]);

  useEffect(() => {
    if (owner == null || repo == null) {
      return;
    }
    fetchIssue();
  }, [owner, repo, pageNum]);

  useEffect(() => {
    if (commentPageNum == commentTotalPage) {
      console.log("disable please");
      setDisplayCommentBut(false);
    } else {
      console.log("I was here");
      setDisplayCommentBut(true);
    }
  }, [commentTotalPage, commentPageNum]);

  return (
    <div>
      <SearchBar setKeyword={setKeyword} handleSubmission={handleSubmission} />
      {error && (
        <Alert key={3} variant="danger">
          {error}
        </Alert>
      )}
      {totalPageNum && (
        <Pagination
          activePage={pageNum}
          itemsCountPerPage={30}
          totalItemsCount={30 * totalPageNum}
          pageRangeDisplayed={5}
          onChange={(clickedPage) => {
            setPageNum(clickedPage);
          }}
          itemClass="page-item"
          linkClass="page-link"
        />
      )}
      <IssueModal
        handleClose={handleClose}
        showModal={showModal}
        commentList={commentList}
        displayCommentBut={displayCommentBut}
      />
      {issueList && <IssueList issueList={issueList} handleShow={handleShow} />}
      <ClipLoader
        css={override}
        size={150}
        color={"#123abc"}
        loading={loading}
      />
    </div>
  );
}
