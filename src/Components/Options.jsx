import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';
import ThemeBtn from './ThemeBtn';
import useLocalStorage from 'use-local-storage';

export default function Options() {
    const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage('theme', preferDark ? 'dark' : 'light');

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <>
            <div className="bg" data-theme={theme}>
                <img
                    className="animated-icon"
                    src="https://user-images.githubusercontent.com/55504616/217468363-e2c929f6-424c-4186-95fe-ab37f07c4d56.svg"
                    alt="octocat-animation"
                />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        position: 'absolute',
                        height:'30%'
                    }}
                >
                    <Button className="btn" href="/game1">
            Battle with a friend
                    </Button>
                    <Button className="btn" href="/game2">
            Battle with a random user
                    </Button>
                </div>
            </div>
            <footer style={{ textAlign: 'center' }} data-theme={theme}>
                <a
                    href="https://github.com/Ananya2001-an/githubwars"
                    target="_blank"
                    style={{ color: 'black', fontSize: '20px', cursor: 'pointer' }}
                    rel="noreferrer"
                >
                    <FaGithub />
                </a>
                <ThemeBtn onChange={toggleTheme}/>
            </footer>
        </>
    );
}
