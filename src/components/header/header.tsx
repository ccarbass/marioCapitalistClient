import React, { useState, useEffect, useContext } from "react";
import { Title1, Title2, Title3, Input, ButtonYellow } from "../index";
import { WorldContext } from "../../context/WorldContext";
import { UserContext } from "../../context/UserContext";
import {transform} from "../../services/util.service";


type Props = {
  name: string;
  logo: string;
  money: number;
  changerQT: (value: number) => void;
};
const Header = ({ name, logo, money, changerQT }: Props) => {
  const worldContext = useContext(WorldContext);
  const userContext = React.useContext(UserContext);
  const [username, setUsername] = useState("");

  const [qt, setQt] = useState(1);
  const qtAchete = () => {
    if (qt === 1) {
      setQt(10);
    }
    if (qt === 10) {
      setQt(100);
    }
    if (qt === 100) {
      setQt(1);
    }
    return qt;
  };

  return (
    <div className="bg-red w-full ">
      <div className="flex justify-between p-3 ">
        <div className="flex space-x-7 items-center">
          <div className="flex items-center">
            <img src={`http://localhost:4000/${logo}`} className="w-16" />
            <Title1>{name}</Title1>
          </div>
          <div className="flex space-x-5 items-center">
            <Title2>{transform(money)}</Title2>
            <img src="/asset/coin.png" className="w-6" />
          </div>
        </div>
        <div className="flex space-x-7 items-center">
          <div
            onClick={() => {
              qtAchete();
              changerQT(qt);
            }}
          >
            <ButtonYellow>Buy x{qt}</ButtonYellow>
          </div>
          <div>
            <Title3>Votre nom : {username}</Title3>
            <input
              type="text"
              value={username.toString()}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") userContext.onChangeUser(username);
              }}
              onBlur={() => userContext.onChangeUser(username)}
              className="rounded-lg m-5 mx-auto justify-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
