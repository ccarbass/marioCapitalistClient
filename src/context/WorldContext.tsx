import React, { useState, useEffect, createContext, ReactNode } from "react";
import { gql, useQuery } from "@apollo/client";
import { World } from "../world";
import { WorldInit } from "./defaultValue";

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

type WorldContextType = {
  world: World | null;
  error: any;
  loading: any;
  setMoney: (money: number) => void;
  setScore: (score: number) => void;

};

type Props = {
  children: ReactNode;
  username: string;
};

const WorldContextDefaultValue: WorldContextType = {
  world: null,
  error: null,
  loading: true,
  setMoney: (money: number) => {},
  setScore: (score: number) => {},
};

export const WorldContext = createContext<WorldContextType>(
  WorldContextDefaultValue
);

export const WorldProvider = ({ children, username }: Props) => {
  const [world, setWorld] = useState<World | null>(null);

  const { loading, error, data, refetch } = useQuery(GET_WORLD, {
    context: {
      headers: { "x-user": username },
    },
  });

  const handleSetMoney = (money: number) => {
    if (world) {
      let newWorld = {...world};
      newWorld.money = money;
      setWorld(newWorld);
    }
  };

  const handleSetScore = (score: number) => {
    if (world) {
      let newWorld = {...world};
      newWorld.score = score;
      setWorld(newWorld);
    }
  };
 
  useEffect(() => {
    if (!loading && !error) {
      if (username !== "") {
        console.log(data);
        setWorld(data.getWorld);
      }
    }
  }, [error, loading, data, username]);

  return (
    <WorldContext.Provider
      value={{
        world: world,
        error: error,
        loading: loading,
        setMoney: handleSetMoney,
        setScore: handleSetScore,
      }}
    >
      {children}
    </WorldContext.Provider>
  );
};
