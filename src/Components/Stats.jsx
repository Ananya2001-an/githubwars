import {useLocation} from 'react-router-dom'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import {FaGithub} from 'react-icons/fa'

export default function Stats(){
  const {state} = useLocation()
  const { width, height } = useWindowSize()
  const {user1, user2} = state;
  
  const {followers:follow_count_1, public_repos:repo_count_1, public_gists:gist_count_1, repos_url:repos_url_1} = user1;
    const {followers:follow_count_2, public_repos:repo_count_2, public_gists:gist_count_2, repos_url:repos_url_2} = user2;
  
  let user1Wins = 0
  let user2Wins = 0
  follow_count_1 > follow_count_2? user1Wins++ :follow_count_1 < follow_count_2? user2Wins++: user1Wins++ && user2Wins++
  
  repo_count_1 > repo_count_2? user1Wins++ :repo_count_1 < repo_count_2? user2Wins++ :user1Wins++ && user2Wins++
  
  gist_count_1 > gist_count_2? user1Wins++ :gist_count_1 < gist_count_2? user2Wins++:user1Wins++ && user2Wins++
  
  return(
    <>
  <div className='bg'>
     <img className="animated-icon" src="../../public/octocat.svg" />
     <div className='stats'>
       <div style={{display:"flex", flexDirection:"column", alignItems:'center', justifyContent:"space-evenly"}}>
         <img src={user1.avatar_url} className="avatar animated-item1"/>
         <h3 className='animated-item2'>Followers: {follow_count_1}</h3>
         <h3 className='animated-item3'>Repositories: {repo_count_1}</h3>
         <h3 className='animated-item4'>Gists: {gist_count_1}</h3>
       </div>
       <div style={{display:"flex", flexDirection:"column", alignItems:'center', justifyContent:"space-evenly"}}>
         <img src={user2.avatar_url} className="avatar animated-item1"/>
         <h3 className='animated-item2'>Followers: {follow_count_2}</h3>
         <h3 className='animated-item3'>Repositories: {repo_count_2}</h3>
         <h3 className='animated-item4'>Gists: {gist_count_2}</h3>
       </div>
      </div>
    <div className='winner'>
      {user1Wins>user2Wins?user1.name + ' ' + 'wins!':user1Wins<user2Wins?user2.name + ' ' + 'wins!':'Both win!'}
    </div>
    <Confetti
      width={width}
      height={height}
    />
  </div>
  <footer style={{marginTop:"-10vh", textAlign:"center"}}>Contribute <a href="" style={{color:"black", fontSize:"20px", cursor:"pointer"}}><FaGithub /></a></footer>
    </>
    )
}