import { Button } from 'react-bootstrap';
import {FaGithub} from 'react-icons/fa';

export default function Home() {
    return (
        <>
            <div className="bg">
                <img className="animated-icon" src="https://user-images.githubusercontent.com/55504616/217468363-e2c929f6-424c-4186-95fe-ab37f07c4d56.svg" alt='octocat-animation'/>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between',alignItems:'center', position:'absolute'}}>
                    <h1 className="heading">GitHubWars</h1>
                    <Button className="btn" href="/options">Start Battle</Button>
                </div>
            </div>
            <footer style={{textAlign:'center'}}><a href="https://github.com/Ananya2001-an/githubwars" target="_blank" 
                style={{color:'black', fontSize:'20px', cursor:'pointer'}} rel="noreferrer"><FaGithub /></a></footer>
        </>
    );
}