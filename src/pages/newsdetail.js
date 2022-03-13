import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/icon.jpg";
import { useHistory } from "react-router";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import ReactWordcloud from "react-wordcloud";
import { Auth } from "aws-amplify";

const NewsDetail = (props) => {
  const history = useHistory();
  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [urltoimg, setUrlToImg] = useState("");
  const [description, setDescription] = useState("");

  const stopWords = [
    "i",
    "me",
    "my",
    "myself",
    "we",
    "our",
    "ours",
    "ourselves",
    "you",
    "you're",
    "you've",
    "you'll",
    "you'd",
    "your",
    "yours",
    "yourself",
    "yourselves",
    "he",
    "him",
    "his",
    "himself",
    "she",
    "she's",
    "her",
    "hers",
    "herself",
    "it",
    "it's",
    "its",
    "itself",
    "they",
    "them",
    "their",
    "theirs",
    "themselves",
    "what",
    "which",
    "who",
    "whom",
    "this",
    "that",
    "that'll",
    "these",
    "those",
    "am",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "having",
    "do",
    "does",
    "did",
    "doing",
    "a",
    "an",
    "the",
    "and",
    "but",
    "if",
    "or",
    "because",
    "as",
    "until",
    "while",
    "of",
    "at",
    "by",
    "for",
    "with",
    "about",
    "against",
    "between",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "to",
    "from",
    "up",
    "down",
    "in",
    "out",
    "on",
    "off",
    "over",
    "under",
    "again",
    "further",
    "then",
    "once",
    "here",
    "there",
    "when",
    "where",
    "why",
    "how",
    "all",
    "any",
    "both",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "no",
    "nor",
    "not",
    "only",
    "own",
    "same",
    "so",
    "than",
    "too",
    "very",
    "s",
    "t",
    "can",
    "will",
    "just",
    "don",
    "don't",
    "should",
    "should've",
    "now",
    "d",
    "ll",
    "m",
    "o",
    "re",
    "ve",
    "y",
    "ain",
    "aren",
    "aren't",
    "couldn",
    "couldn't",
    "didn",
    "didn't",
    "doesn",
    "doesn't",
    "hadn",
    "hadn't",
    "hasn",
    "hasn't",
    "haven",
    "haven't",
    "isn",
    "isn't",
    "ma",
    "mightn",
    "mightn't",
    "mustn",
    "mustn't",
    "needn",
    "needn't",
    "shan",
    "shan't",
    "shouldn",
    "shouldn't",
    "wasn",
    "wasn't",
    "weren",
    "weren't",
    "won",
    "won't",
    "wouldn",
    "wouldn't",
  ];

  const words = [];
  const para = title.concat(authorName, description);
  const cleanData = para.replace(/[^a-zA-Z0-9 ]/g, "");
  const wordsPara = cleanData.split(" ");
  const finalWordMap = new Map();
  wordsPara.forEach((word) => {
    if (!stopWords.includes(word)) {
      if (!finalWordMap.has(word)) {
        finalWordMap.set(word, 1);
      } else {
        const count = parseInt(finalWordMap.get(word));
        finalWordMap.set(word, count + 1);
      }
    }
  });

  const wordCloudData = async () => {
    finalWordMap.forEach((value, key) => {
      let word = {};
      word["text"] = key;
      word["value"] = value;
      words.push(word);
    });
  };

  const options = {
    fontFamily: "arial",
    fontSizes: [15, 30],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1,
  };
  const size = [500, 400];

  const handleLogOut = async (event) => {
    event.preventDefault();
    try {
      Auth.signOut();
      props.setIsAuthenticated(false);
      props.setUser(null);
      history.replace("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setAuthorName(localStorage.getItem("authorName"));
    setTitle(localStorage.getItem("title"));
    setUrlToImg(localStorage.getItem("urltoimg"));
    setDescription(localStorage.getItem("description"));
    wordCloudData();
  });
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = async (e) => {
    e.stopPropagation();
    setOpenModal(!openModal);
  };

  return (
    <>
      {props.isAuthenticated ? (
        <>
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <img
                src={Logo}
                alt=""
                className="navbar-brand"
                style={{
                  width: "auto",
                  height: "auto",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />

              <Link className="navbar-brand" to={"/homepage"}>
                <b>CloudNews</b>
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      onClick={toggleModal}
                      style={{ cursor: "pointer" }}
                    >
                      Sentiment Analysis
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/searchhistory"}>
                      Search History
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/following"}>
                      Following
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={handleLogOut}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="auth-wrapper" style={{ marginTop: "70px" }}>
            <div className="auth-inner-search">
              <h3 style={{ textAlign: "start" }}>{title}</h3>
              <img
                src={
                  urltoimg
                    ? urltoimg
                    : "https://1m19tt3pztls474q6z46fnk9-wpengine.netdna-ssl.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png"
                }
                style={{ width: "200px", height: "200px", float: "right" }}
              />
              <p> - {authorName}</p>
              <p style={{ textAlign: "start" }}>{description}</p>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={toggleModal}
              >
                WordCloud{" "}
              </button>
            </div>
          </div>
          <Modal isOpen={openModal} toggle={toggleModal}>
            <ModalHeader
              toggle={toggleModal}
              style={{ backgroundColor: "#a0aecdb0", color: "#FFFFFF" }}
            >
              Word Cloud
            </ModalHeader>
            <ModalBody>
              <div
                style={{
                  height: "auto",
                  width: "470px",
                  display: "block",
                  justifyContent: "center",
                  backgroundColor: "#9c9c9c21",
                  marginRight: "150px",
                }}
              >
                <ReactWordcloud words={words} options={options} size={size} />
              </div>
            </ModalBody>
          </Modal>
        </>
      ) : (
        <div className="auth-wrapper">
          <div className="auth-inner">
            <h1>Opps!</h1>
            <p>
              You are logout! Please click <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};
export default NewsDetail;
