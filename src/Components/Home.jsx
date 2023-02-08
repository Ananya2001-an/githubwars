import { Button } from "react-bootstrap"
import {FaGithub} from 'react-icons/fa'

export default function Home() {
  return (
    <>
    <div className="bg">
      <img className="animated-icon" src="../../public/octocat.svg" />
      <div style={{display:'flex', flexDirection:"column", justifyContent:"space-between",alignItems:"center", position:"absolute"}}>
        <h1 className="heading">GitHubWars</h1>
        <Button className="btn" href="/game">Start Battle</Button>
      </div>
    </div>
    <footer style={{marginTop:"-10vh", textAlign:"center"}}>Contribute <a href="" style={{color:"black", fontSize:"20px", cursor:"pointer"}}><FaGithub /></a></footer>
    </>
  )
}