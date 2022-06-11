import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { gql, useQuery } from '@apollo/client';
import { World } from '../world';

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
        paliers {
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
  username: String;
  world: World | null;
  error: any;
  loading: any;
  onChangeUser: (username: String) => void;
};

type Props = {
  children: ReactNode;
};

const WorldContextDefaultValue: WorldContextType = {
  username: '',
  world: null,
  error: null,
  loading: true,
  onChangeUser: (username) => {}
};

export const WorldContext = createContext<WorldContextType>(
  WorldContextDefaultValue
);

export const WorldProvider = ({ children }: Props) => {
  const [username, setUsername] = useState<String>('');
  const [world, setWorld] = useState<World | null>(null);

  const handleUsernameChange = (username: String) => {
    setUsername(username);
    localStorage.setItem('username', username.toString());
  };

  const { loading, error, data, refetch } = useQuery(GET_WORLD);

  useEffect(() => {
    const usernameStored = localStorage.getItem('username');
    if (usernameStored) setUsername(usernameStored);
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      setWorld(data.getWorld);
    }
  }, [error, loading, data]);

  return (
    <WorldContext.Provider
      value={{
        username: username,
        world: world,
        error: error,
        loading: loading,
        onChangeUser: (username) => {
          handleUsernameChange(username);
        }
      }}
    >
      {children}
    </WorldContext.Provider>
  );
};
