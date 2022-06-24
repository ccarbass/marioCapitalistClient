import React, { useState, useContext, useEffect, useRef } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { UserContext } from "../../context/UserContext";
import { ButtonBuy, TitleCard, ProgressBarProduct, MyProgrssBar } from "..";
import { Orientation } from "../progressBar/MyprogressBar";
import { Product, World } from "../../world";

const GET_WORLD = gql`
  query ExampleQuery {
    getWorld {
      name
    }
  }
`;

type Props = {
  name: string;
  image: string;
  cout: number;
  croissance: number;
  quantite: number;
  timeleft: number;
  imageCoin: string;
  world: World;
  id: number;
  vitesse: number;
  managerUnlocked: boolean;
  quantiteBuy: number;
  achatProduit: () => void;
  lancerProduction: () => void;
  finirProduction: () => void;
  onProductionDone: (product: Product) => void
};

const CardProduct = ({
  id,
  name,
  image,
  cout,
  quantite,
  timeleft,
  imageCoin,
  world,
  vitesse,
  managerUnlocked,
  quantiteBuy,
  achatProduit,
  lancerProduction,
  finirProduction,
  onProductionDone
  
}: Props) => {
  const userContext = useContext(UserContext);
  const [run, setRun] = useState(false);
  const [timeleftUpdtaded, setTimeLeftUpdated] = useState(timeleft);
  let lastupdate = parseInt(world.lastupdate)

  const refreshProgress = () => {
    let newTimeLeft = timeleftUpdtaded - 100;
    if (newTimeLeft > 0) {
      console.log(newTimeLeft, vitesse, run);
      setTimeLeftUpdated(timeleftUpdtaded - 100);
    } else if (run) {
      setTimeLeftUpdated(0);
      setRun(false);
      finirProduction()
      // TODO: envoyer l'info au Main
    }
  };

  
  const startFabrication = () => { 
    if(quantite !== 0){
        
   
        lancerProduction()
        //passe run à true
        setRun(true)
        timeleft = vitesse
        lastupdate = Date.now()
    }
};

function onProgressbarCompleted() {
  setRun(false);
}

  const savedCallback = useRef(refreshProgress);
  useEffect(() => (savedCallback.current = refreshProgress));
  useEffect(() => {
    let timer = setInterval(() => savedCallback.current(), 100);
    return function cleanup() {
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div className="bg-red w-fit min-h-fit rounded-md h-80">
      <div className="mx-auto items-center">
        <div className="flex">
          <TitleCard>{name}</TitleCard>
          <div className="bg-yellow items-center w-5 rounded-full h-fit">
            {quantite}
          </div>
        </div>
        <img
          src={`http://localhost:4000/${image}`}
          className="mx-auto w-5/12 max-h-34 h-36"
          onClick={() => {
            lancerProduction();
            setTimeLeftUpdated(vitesse);
            setRun(true);
            startFabrication();
          }}
        />
      </div>
      <div className="flex items-center m-6 pb-10 max-h-fit">
        <div className="w-48 mr-3">
          <ProgressBarProduct
            completed={run ? ((vitesse - timeleftUpdtaded) / vitesse) * 100 : 0}
            color="#13ce66"
            animation={100}
            height={40}
          />
        </div>

        <ButtonBuy
          quantity={quantiteBuy}
          cout={cout}
          image={imageCoin}
          worldMoney={world.money}
          id={id}
          timeleft={vitesse}
          onClick={() => achatProduit()}
        ></ButtonBuy>
      </div>
    </div>
  );
};

export default CardProduct;
