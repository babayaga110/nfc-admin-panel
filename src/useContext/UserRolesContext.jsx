import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import Loading from "../components/Loading/Loading";

const UserRolesContext = createContext();

export const useUserRoles = () => useContext(UserRolesContext);

export const UserRolesProvider = ({ children }) => {
  const [userRoles, setUserRoles] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          setUserRoles(idTokenResult.claims);
        } catch (error) {
          console.error("Error fetching ID token result:", error);
          setUserRoles({});
        }
      } else {
        console.log("No user is signed in.");
        setUserRoles({});
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  return (
    <UserRolesContext.Provider value={userRoles}>
      {loading ? <Loading /> : children}
    </UserRolesContext.Provider>
  );
};
