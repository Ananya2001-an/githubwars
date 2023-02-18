import {useRef, useState, useEffect} from 'react';
import {Button, Form, InputGroup, Alert} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {FaGithub} from 'react-icons/fa';

export default function Game1() {
	const [user1, setUser1] = useState('');
	const [user2, setUser2] = useState('');
	const [error, setError] = useState('');
	const [hideInput1, setHideInput1] = useState(false);
	const [hideInput2, setHideInput2] = useState(true);
	const [inputValue, setInputValue] = useState('');
	const username1Ref = useRef();
	const username2Ref = useRef();
	const navigate = useNavigate();
	const headers = {
		authorization: `token ${process.env.REACT_APP_PAT}`,
	};
	const fetchUser = (user_no) => {
		fetch(
			`https://api.github.com/users/${
				user_no === '1'
					? username1Ref.current.value
					: username2Ref.current.value
			}`,
			{
				method: 'GET',
				headers: headers,
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.message === undefined) {
					setError('');
					user_no === '1' ? setUser1(data) : setUser2(data);
					user_no === '1' ? setHideInput1(true) : setHideInput2(true);
					user_no === '1' ? setHideInput2(false) : setHideInput2(true);
				} else {
					setError('Invalid Username!');
				}
			});
	};

	const battle = () => {
		navigate('/stats', {state: {user1, user2}});
	};

	useEffect(() => {
		const storedValue = localStorage.getItem('myData');
		if (storedValue) {
		setInputValue(storedValue);
		}
	}, []);

	const handleInputChange = (event) => {
		const value = event.target.value;
		setInputValue(value);
		localStorage.setItem('myData', value);
	};
	return (
		<>
			<div className='bg'>
				<img
					className='animated-icon'
					src='https://user-images.githubusercontent.com/55504616/217468363-e2c929f6-424c-4186-95fe-ab37f07c4d56.svg'
					alt='octocat-animation'
				/>
				<div className='arena'>
					<div className='user1'>
						{user1 !== '' && (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}>
								<img src={user1.avatar_url} className='avatar' alt='player1' />
								<h1>{user1.name}</h1>
								<p style={{fontSize: '20px', textAlign: 'center'}}>
									{user1.bio}
								</p>
							</div>
						)}
						{error !== '' && hideInput1 !== true && (
							<Alert variant='danger'>{error}</Alert>
						)}
						<InputGroup hidden={hideInput1}>
							<Form.Control
								ref={username1Ref}
								placeholder='Enter 1st GitHub Username'
								style={{background: 'transparent'}}
								value={inputValue}
								onChange={handleInputChange}
								
							/>
							<Button className='btn' onClick={() => fetchUser('1')}>
								Get
							</Button>
						</InputGroup>
					</div>
					<Button
						className='btn'
						disabled={!hideInput1 || !hideInput2}
						onClick={() => battle()}>
						Battle
					</Button>
					<div className='user2'>
						{hideInput1 === false && (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}>
								<img
									src='https://user-images.githubusercontent.com/55504616/217468609-0d6531b4-9251-47c2-919a-7d5f79b9df8a.gif'
									width='100px'
									height='100px'
									alt='loading-gif'
								/>
								<p
									style={{
										color: 'var(--theme)',
										fontSize: '15px',
										textAlign: 'center',
									}}>
									Waiting for first player . . .
								</p>
							</div>
						)}
						{user2 !== '' && (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}>
								<img src={user2.avatar_url} className='avatar' alt='player2' />
								<h1>{user2.name}</h1>
								<p style={{fontSize: '20px', textAlign: 'center'}}>
									{user2.bio}
								</p>
							</div>
						)}
						{error !== '' && hideInput2 !== true && (
							<Alert variant='danger'>{error}</Alert>
						)}
						<InputGroup hidden={hideInput2}>
							<Form.Control
								ref={username2Ref}
								placeholder='Enter 2nd GitHub Username'
								style={{background: 'transparent'}}
							/>
							<Button className='btn' onClick={() => fetchUser('2')}>
								Get
							</Button>
						</InputGroup>
					</div>
				</div>
			</div>
			<footer style={{textAlign: 'center'}}>
				<a
					href='https://github.com/Ananya2001-an/githubwars'
					target='_blank'
					style={{color: 'black', fontSize: '20px', cursor: 'pointer'}}
					rel='noreferrer'>
					<FaGithub />
				</a>
			</footer>{' '}
		</>
	);
}
