import React, { Fragment, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { WorldProvider } from "./context/WorldContext";
import { World } from "./world";
import { WorldContext } from "./context/WorldContext";
import { UserContext } from "./context/UserContext";
import { Main } from "./page";
import { Title1 } from "./components";

const GET_WORLD = gql`
  query ExampleQuery {
    getWorld {
      name
      logo
      money
      score
      totalangels
      activeangels
      angelbonus
      lastupdate
      products {
        id
        name
        logo
        cout
        croissance
        revenu
        vitesse
        quantite
        timeleft
        managerUnlocked
        palliers {
          name
          logo
          seuil
          idcible
          ratio
          typeratio
          unlocked
        }
      }
      allunlocks {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
      upgrades {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
      angelupgrades {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
      managers {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
    }
  }
`;

type Props = {
  username: string;
};

function App({ username }: Props) {
  const { loading, error, data, refetch } = useQuery(GET_WORLD, {
    context: { headers: { "x-user": username } },
  });

  let corps = undefined;
  if (loading) corps = <div> Loading... </div>;
  else if (error) corps = <div> Erreur de chargement du monde ! </div>;
  else{
    corps = (
      <div>
        <Main loadworld={data.getWorld} username={username}></Main>
      </div>
    );}

  return (
    <div className="App max-h-full overflow-hidden	bg-bottom cursor-couronne">
      {corps}
    </div>
  );
}

const Authenticated = () => {
  const userContext = React.useContext(UserContext);
  const [username, setUsername] = useState("");

  console.log(userContext.username);

  return (
    <>
      {userContext.username !== "" ? (
        <App username={userContext.username} />
      ) : (
        <div className="bg-red h-screen w-full mx-auto my-auto p-44 flex">
          <Title1>
            Rentre ton nom afin de commencer ou continuer de jouer
          </Title1>
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
      )}
    </>
  );
};

export default Authenticated;
