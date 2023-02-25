import { useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import {FaGithub} from 'react-icons/fa';
import ThemeBtn from './ThemeBtn';
import useTheme from '../Contexts/useTheme';

export default function Stats() {
	const {state} = useLocation();
	const {width, height} = useWindowSize();
	const {user1, user2} = state;
	const navigate = useNavigate();
	const [theme, toggleTheme] = useTheme();
	const battleAgain = () => {
		navigate('/options');
	};
	const user2ProfileLink = 'https://github.com/'+user2.login;
	const user1ProfileLink = 'https://github.com/'+user1.login;
	const {
		followers: follow_count_1,
		public_repos: repo_count_1,
		public_gists: gist_count_1,
	} = user1;
	const {
		followers: follow_count_2,
		public_repos: repo_count_2,
		public_gists: gist_count_2,
	} = user2;

	let user1Wins = 0;
	let user2Wins = 0;
	follow_count_1 > follow_count_2
		? user1Wins++
		: follow_count_1 < follow_count_2
		? user2Wins++
		: user1Wins++ && user2Wins++;

	repo_count_1 > repo_count_2
		? user1Wins++
		: repo_count_1 < repo_count_2
		? user2Wins++
		: user1Wins++ && user2Wins++;

	gist_count_1 > gist_count_2
		? user1Wins++
		: gist_count_1 < gist_count_2
		? user2Wins++
		: user1Wins++ && user2Wins++;

	useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

	return (
		<>
			<div className='bg' data-theme={theme}>
				<img
					className='animated-icon'
					src='https://user-images.githubusercontent.com/55504616/217468363-e2c929f6-424c-4186-95fe-ab37f07c4d56.svg'
					alt='octocat-animation'
				/>
				<div className='stats'>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-evenly',
						}}>
						<img
							src={user1.avatar_url}
							className='avatar animated-item1'
							alt='player1'
						/>
						<h3 className='animated-item2'>Followers: {follow_count_1}</h3>
						<h3 className='animated-item3'>Repositories: {repo_count_1}</h3>
						<h3 className='animated-item4'>Gists: {gist_count_1}</h3>
						<a
							href={user1ProfileLink} 
							target='_blank'
							style={{color: 'black', fontSize: '40px', cursor: 'pointer'}}
							rel='noreferrer'>
							<FaGithub />
						</a>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-evenly',
						}}>
						<img
							src={user2.avatar_url}
							className='avatar animated-item1'
							alt='player2'
						/>	
						<h3 className='animated-item2'>Followers: {follow_count_2}</h3>
						<h3 className='animated-item3'>Repositories: {repo_count_2}</h3>
						<h3 className='animated-item4'>Gists: {gist_count_2}</h3>
						<a
							href={user2ProfileLink} 
							target='_blank'
							style={{color: 'black', fontSize: '40px', cursor: 'pointer'}}
							rel='noreferrer'>
							<FaGithub />
						</a>
					</div>
				</div>
				<div
					style={{
						position: 'absolute',
						display: 'flex',
						flexDirection: 'column',
						gap: '1rem',
						alignItems: 'center',
					}}>
					<div className='winner'>
						{user1Wins > user2Wins
							? user1.name
							: user1Wins < user2Wins
							? user2.name
							: 'No one'}{' '}
						wins! 	

					</div>
					<Button className='btn' onClick={battleAgain}>
						Battle Again 
					</Button>
				</div>
				<Confetti width={width} height={height} />
			</div>
			<footer style={{textAlign: 'center'}} data-theme={theme}>
				<a
					href='https://github.com/Ananya2001-an/githubwars'
					target='_blank'
					style={{color: 'black', fontSize: '20px', cursor: 'pointer'}}
					rel='noreferrer'>
					<FaGithub />
				</a>
				<ThemeBtn onChange={toggleTheme} />
			</footer>
		</>
	);
}
