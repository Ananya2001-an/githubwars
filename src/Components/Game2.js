import { useRef, useState } from "react";
import { Button, Form, InputGroup, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

export default function Game2() {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [error, setError] = useState("");
  const [hideInput, setHideInput] = useState(false);
  const usernameRef = useRef();
  const navigate = useNavigate();

  const fetchUser = () => {
    fetch(
      `https://api.github.com/users/${ usernameRef.current.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === undefined) {
          setError("");
          setUser1(data)
          setHideInput(true)
        } else {
          setError("Invalid Username!");
        }
      });
  };

  const battle = () => {
    navigate("/stats", { state: { user1, user2 } });
  };

  return (
    <>
      <div className="bg">
        <img
          className="animated-icon"
          src="https://user-images.githubusercontent.com/55504616/217468363-e2c929f6-424c-4186-95fe-ab37f07c4d56.svg"
          alt="octocat-animation"
        />
        <div className="arena">
          <div className="user1">
            {user1 !== "" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <img src={user1.avatar_url} className="avatar" alt="player1" />
                <h1>{user1.name}</h1>
                <p style={{ fontSize: "20px", textAlign: "center" }}>
                  {user1.bio}
                </p>
              </div>
            )}
            {error !== "" && hideInput !== true && (
              <Alert variant="danger">{error}</Alert>
            )}
            <InputGroup hidden={hideInput}>
              <Form.Control
                ref={usernameRef}
                placeholder="Enter 1st GitHub Username"
                style={{ background: "transparent" }}
              />
              <Button className="btn" onClick={() => fetchUser()}>
                Get
              </Button>
            </InputGroup>
          </div>
          <Button
            className="btn"
            disabled={!hideInput}
            onClick={() => battle()}
          >
            Battle
          </Button>
          <div className="user2">
            {hideInput === false && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://user-images.githubusercontent.com/55504616/217468609-0d6531b4-9251-47c2-919a-7d5f79b9df8a.gif"
                  width="100px"
                  height="100px"
                  alt="loading-gif"
                />
                <p
                  style={{
                    color: "var(--theme)",
                    fontSize: "15px",
                    textAlign: "center",
                  }}
                >
                  Waiting for first player . . .
                </p>
              </div>
            )}
            {hideInput === true && 
                <div>random user</div>
            }
          </div>
        </div>
      </div>
      <footer style={{ textAlign: "center" }}>
        <a
          href="https://github.com/Ananya2001-an/githubwars"
          target="_blank"
          style={{ color: "black", fontSize: "20px", cursor: "pointer" }}
          rel="noreferrer"
        >
          <FaGithub />
        </a>
      </footer>{" "}
    </>
  );
}
