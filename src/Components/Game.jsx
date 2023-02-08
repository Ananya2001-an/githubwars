import { useRef, useState } from "react";
import { Button, Form, InputGroup, Alert} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import {FaGithub} from 'react-icons/fa'

export default function Game() {  
  const [user1, setUser1] = useState('')
  const [user2, setUser2] = useState('')
  const [error, setError] = useState('')
  const [hideInput1, setHideInput1] = useState(false)
  const [hideInput2, setHideInput2] = useState(true)
  const username1Ref = useRef()
  const username2Ref = useRef()
  const navigate = useNavigate()

  const fetchUser = (user_no) => {
      fetch(`https://api.github.com/users/${user_no === '1'?username1Ref.current.value:username2Ref.current.value}`)
        .then(res => res.json())
        .then(data => {
          if (data.message === undefined) {
            setError('')
            user_no === '1'?setUser1(data):setUser2(data)
            user_no === '1'?setHideInput1(true):setHideInput2(true)
            user_no === '1'?setHideInput2(false):setHideInput2(true)
          } else {
            setError("Invalid Username!")
          }
        })
  }

  const battle = ()=>{
    navigate('/stats', {state:{user1, user2}})    
  }
  
  return (
    <>
    <div className="bg">
      <img className="animated-icon" src="../images/octocat.svg" />
      <div className="arena">
        <div className="user1">
          {
            user1 !== '' && <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
              <img src={user1.avatar_url} className="avatar" />
              <h1>{user1.name}</h1>
              <p align="center" style={{ fontSize: "20px" }}>{user1.bio}</p>
            </div>
          }
          {
            error !== '' && hideInput1 !== true && <Alert variant='danger'>{error}</Alert>
          }
          <InputGroup hidden={hideInput1}>
            <Form.Control
              ref={username1Ref}
              placeholder="Enter 1st GitHub Username"
              style={{ background: "transparent" }}
            />
            <Button className="btn" onClick={() => fetchUser('1')}>
              Get
            </Button>
          </InputGroup>
        </div>
        <Button className="btn" disabled={!hideInput1 || !hideInput2} onClick={()=>battle()}>Battle</Button>
        <div className="user2">
          {
            hideInput1 === false && <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><img src="../../public/mona.gif" width="100px" height="100px" />
              <p align="center" style={{ color: "var(--theme)", fontSize: "15px" }}>Waiting for first player . . .</p></div>
          }
          {
            user2 !== '' && <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
              <img src={user2.avatar_url} className="avatar" />
              <h1>{user2.name}</h1>
              <p align="center" style={{ fontSize: "20px" }}>{user2.bio}</p>
            </div>
          }
          {
            error !== '' && hideInput2 !== true && <Alert variant='danger'>{error}</Alert>
          }
          <InputGroup hidden={hideInput2}>
            <Form.Control
              ref={username2Ref}
              placeholder="Enter 2nd GitHub Username"
              style={{ background: "transparent" }}
            />
            <Button className="btn" onClick={() => fetchUser('2')}>
              Get
            </Button>
          </InputGroup>
        </div>
      </div>
    </div>
      <footer style={{marginTop:"-10vh", textAlign:"center"}}>Contribute <a href="" style={{color:"black", fontSize:"20px", cursor:"pointer"}}><FaGithub /></a></footer>
    </>
    )
}