"use client";

import { useEffect, useState } from "react";
import UserContext from "./userContext";
import { currentUser } from "@/services/userServ";

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    async function getCurrentUser() {
      try {
        const loggedUser = await currentUser();
        setUser({ ...loggedUser });
        console.log(user);
      } catch (error: any) {
        console.log(error);
      }
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
};
export default UserProvider;
