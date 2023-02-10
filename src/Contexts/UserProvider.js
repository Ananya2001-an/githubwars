import React, { useContext, useEffect, useState } from 'react';

const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async (url)=>{
            await fetch(url)
                .then(res => res.json())
                .then(data =>{
                    if(data.length !== 0){
                        console.log(data);
                    }
                    else{
                        return;
                    }
                });
        };

        fetchUsers('https://api.github.com/users?per_page=100');
    }, []);

    const value = { users };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
