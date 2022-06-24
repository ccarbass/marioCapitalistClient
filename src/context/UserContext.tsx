import React, { useState, useEffect, createContext, ReactNode } from "react";
import { gql, useQuery } from "@apollo/client";
import { World } from "../world";
import { WorldInit } from "./defaultValue";

type UserContextType = {
  username: string;
  onChangeUser: (username: string) => void;
};

type Props = {
  children: ReactNode;
};

const UserContextDefaultValue: UserContextType = {
  username: "",
  onChangeUser: (username) => {},
};

export const UserContext = createContext<UserContextType>(
  UserContextDefaultValue
);

export const UserProvider = ({ children }: Props) => {
  const [username, setUsername] = useState<string>("");

  const handleUsernameChange = (username: string) => {
    setUsername(username);
    localStorage.setItem("username", username.toString());
  };

  useEffect(() => {
    const usernameStored = localStorage.getItem("username");
    if (usernameStored) setUsername(usernameStored);
  }, []);

  return (
    <UserContext.Provider
      value={{
        username: username,
        onChangeUser: (username) => {
          handleUsernameChange(username);
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
