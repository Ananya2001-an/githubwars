import React, { useContext, useEffect, useState } from 'react';

const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = async (url) => {
            const headers = {
                authorization: `token ${process.env.REACT_APP_PAT}`,
            };
            const response = await fetch(url, {
                method: 'GET',
                headers: headers,
            });
            const data = await response.json();

            if (data.length !== 0) {
                data.map((user) => {
                    const { login } = user;
                    setUsers((prev) => [...prev, login]);
                });
                getAllUsers(
                    `https://api.github.com/users?per_page=100&since=${
                        data[data.length - 1].id
                    }`
                );
            } else {
                return;
            }
        };

        getAllUsers('https://api.github.com/users?per_page=100');
    }, []);

    const value = { users };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
