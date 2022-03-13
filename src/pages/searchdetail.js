import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router";
import Logo from "../assets/images/icon.jpg";import { Modal, ModalHeader, ModalBody } from "reactstrap";


const Searchdetail = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(location.state.topic);
  const tempSearch = location.state.topic;
  const noResponse = [
    {
      title: "No Articles Found",
      description: "",
      author: "",
    },
  ];

  const [openModal, setOpenModal] = useState(false);

  const toggleModal = async (e) => {
    e.stopPropagation();
    setOpenModal(!openModal);
  };

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
    const topicName = location.state.topic;
    setSearch(topicName);

    getSearchNews();
  }, [location, tempSearch]);

  const handleChange = (event) => {
    setSearch(String(event.target.value));
  };

  const newsDetailPage = async (index) => {
    localStorage.setItem("authorName", articles[index].author);
    localStorage.setItem("title", articles[index].title);
    localStorage.setItem("urltoimg", articles[index].urlToImage);
    localStorage.setItem("description", articles[index].description);
    history.push("/newsdetail");
  };

  const getSearchNews = async () => {
    try {
      setLoading(true);
      const email_verified = props.user.attributes["email"];
      const response = await axios.post(
        "https://9mwtisdt71.execute-api.us-east-1.amazonaws.com/search-topic",
        {
          topic: search,
          emailAddress: email_verified,
        }
      );

      setLoading(false);
      if (response.data.articles.length < 1) {
        setArticles(noResponse);
      } else {
        setArticles(response.data.articles);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getFollow = async () => {
    const email_verified = props.user.attributes["email"];
    await axios.post(
      "https://9mwtisdt71.execute-api.us-east-1.amazonaws.com/follow-topic",
      {
        emailAddress: email_verified,
        followTopic: search,
      }
    );
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
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      onClick={toggleModal}
                      style={{ cursor: "pointer" }}
                    >
                      Sentiment Analysis
                    </a>
                  </li>
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
              <div className="input-group rounded">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search"
                  id="search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  defaultValue={search}
                  onChange={handleChange}
                />
                <img
                  src="https://media.istockphoto.com/vectors/search-icon-vector-id1068237878?k=20&m=1068237878&s=170667a&w=0&h=BpBnkSHoDP3tPTyBvzu_rWcVVb_c0dTSNs9XbC-xfc8="
                  style={{ width: "50px", height: "50px" }}
                  onClick={getSearchNews}
                />
              </div>
            </div>
            <br></br>
            <div className="auth-inner-list">
              <div
                className="input-group rounded"
                style={{ display: "flex", justifyContent: "flex-end" }}
                onClick={getFollow}
              >
                <h4>Follow</h4>
                <img
                  src="https://cdn2.iconfinder.com/data/icons/media-player-ui/512/Media-Icon-25-512.png"
                  alt="show/hide"
                  style={{ width: "40px", height: "40px", marginTop: "-5px" }}
                />
              </div>

              <h3 style={{ textAlign: "start" }}>List of searched news</h3>
              {loading ? (
                <>
                  <div style={{ textAlign: "center", padding: "30px" }}>
                    <div className="spinner-grow text-primary" role="status">
                      <span className="sr-only"></span>
                    </div>
                    <div className="spinner-grow text-secondary" role="status">
                      <span className="sr-only"></span>
                    </div>
                    <div className="spinner-grow text-success" role="status">
                      <span className="sr-only"></span>
                    </div>
                    <div className="spinner-grow text-danger" role="status">
                      <span className="sr-only"></span>
                    </div>
                    <div className="spinner-grow text-warning" role="status">
                      <span className="sr-only"></span>
                    </div>
                    <div className="spinner-grow text-info" role="status">
                      <span className="sr-only"></span>
                    </div>
                    <div className="spinner-grow text-dark" role="status">
                      <span className="sr-only"></span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {articles.map((element, index) => {
                    return (
                      <div className="container" key={index}>
                        <div
                          className="row border news"
                          style={{
                            margin: "10px",
                            padding: "10px",
                            cursor: "pointer",
                            borderRadius: "5px",
                          }}
                          onClick={() => newsDetailPage(index)}
                        >
                          <div className="col-8">
                            <h5 className="card-title">{element.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                              {element.description}
                            </h6>
                            <p className="card-text"> - {element.author}</p>
                          </div>
                          <div
                            className="col"
                            style={{
                              display: "block",
                              marginRight: "0px",
                              marginLeft: "0px",
                            }}
                          >
                            <img
                              src={
                                element.urlToImage
                                  ? element.urlToImage
                                  : "https://1m19tt3pztls474q6z46fnk9-wpengine.netdna-ssl.com/wp-content/themes/unbound/images/No-Image-Found-400x264.png"
                              }
                              style={{
                                float: "right",
                                width: "150px",
                                height: "100px",
                              }}
                              className="rounded"
                            ></img>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
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
          hi
        </div>
      </ModalBody>
    </Modal>
            </div>
          </div>
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
export default Searchdetail;
