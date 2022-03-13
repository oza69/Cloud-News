import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../assets/images/icon.jpg";
import { Auth } from "aws-amplify";
import axios from "axios";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const Following = (props) => {
  const history = useHistory();
  const [finalTopic, setFinalTopic] = useState([]);
  useEffect(() => {
    getFollowingTopics();
  }, []);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = async (e) => {
    e.stopPropagation();
    setOpenModal(!openModal);
  };

  const getFollowingTopics = async () => {
    try {
      const email_verified = props.user.attributes["email"];
      const response = await axios.post(
        "https://9mwtisdt71.execute-api.us-east-1.amazonaws.com/get-history",
        {
          emailAddress: email_verified,
        }
      );
      const followTopic = response.data.Item.Following;
      const topics = followTopic.split("| ");
      topics.forEach((element) => {
        if (element.trim().length > 0) {
          let topic = {};
          topic["name"] = element.split("<-->")[0].trim();
          topic["datetime"] = element.split("<-->")[1].trim();
          setFinalTopic((prev) => [...prev, topic]);
        }
      });
    } catch (err) {
      console.log(err);
    }
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
              <div className="container">
                <div className="row">
                  <div
                    className="col-sm"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!!finalTopic.length &&
                      finalTopic.map((element, index) => (
                        <>
                          <div className="row">
                            <div className="col">
                              <button
                                type="button"
                                className="btn btn-outline-dark"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-heart-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                  />
                                </svg>
                                {"  "}
                                {element.name}
                                {"  "}
                                {element.datetime}
                              </button>
                            </div>
                          </div>
                        </>
                      ))}
                  </div>
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
export default Following;
