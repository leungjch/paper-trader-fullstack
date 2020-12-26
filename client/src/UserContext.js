import React from "react";

const UserContext = React.createContext({user: {}});

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ name: '', auth: false });
  
    const login = (name) => {
      setUser((user) => ({
        name: name,
        auth: true,
      }));
    };
  
    const logout = () => {
      setUser((user) => ({
        name: '',
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

