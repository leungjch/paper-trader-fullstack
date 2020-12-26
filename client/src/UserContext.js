import React from "react";

const UserContext = React.createContext({user: {}});

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ name: '', id: '', auth: false });
  
    const login = (name, userId) => {
      setUser((user) => ({
        name: name,
        id: userId,
        auth: true,
      }));
    };
  
    const logout = () => {
      setUser((user) => ({
        name: '',
        id: '',
        auth: false,
      }));
    };
  
    return (
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    );
  };

export {
    UserContext,
    UserProvider
  };

