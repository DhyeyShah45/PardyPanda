import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const ROLE = {
    Super: 1,
    EA: 2,
    ROA: 3,
  };
  useEffect(() => {
    const details = JSON.parse(sessionStorage.getItem("details"));
    if (details) {
      // console.log(JSON.parse(details));
      setUser(details.user);
      setToken(details.token);
      const role = details.user.role;
      if (role === "Super") {
        setRole(ROLE.Super);
      } else if (role === "Admin EA") {
        setRole(ROLE.EA);
      } else {
        setRole(ROLE.ROA);
      }
    }
  }, []);
  return (
    <UserContext.Provider
      value={{ user, setUser, role, setRole, token, setToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
