import { useState } from 'react';

const useTheme = () => {
    const preferDark = window.matchMedia('(prefers-color-scheme; dark)').matches;
    const defaultTheme = localStorage.getItem('theme') || (preferDark ? 'dark' : 'light');
    const [theme, setTheme] = useState(defaultTheme);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return [theme, toggleTheme];
};

export default useTheme;