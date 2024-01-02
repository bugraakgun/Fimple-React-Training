import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../common/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import Spinner from "../components/Spinner";

export const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth,email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <UserContext.Provider
      value={value}
    >
      {loading ? <Spinner /> : children}
    </UserContext.Provider>
  );
};
