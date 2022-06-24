import React, { useState, useContext, useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { UserContext } from "../../context/UserContext";
import { ButtonBuy, TitleCard, ProgressBarProduct, MyProgrssBar } from "..";
import { Orientation } from "../progressBar/MyprogressBar";
import { World } from "../../world";

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
  setWorld: (value: JSON) => void;
  //calcproduct:()=>{};
};

const lancerProduction = gql`
  mutation LancerProductionProduit($id: Int!) {
    lancerProductionProduit(id: $id) {
      id
    }
  }
`;

const CardProduct = ({
  id,
  name,
  image,
  cout,
  croissance,
  quantite,
  timeleft,
  imageCoin,
  world,
  vitesse,
  managerUnlocked,
  quantiteBuy,
  setWorld,
}: Props) => {
  const userContext = useContext(UserContext);
  const [updatedWorld, setUpdatedWorld] = useState(
    JSON.parse(JSON.stringify(world))
  );
  const [run, setRun] = useState(false);
  const [lancer, { data, loading, error }] = useMutation(lancerProduction, {
    context: { headers: { "x-user": userContext.username } },
  });
  function onProgressbarCompleted() {
    setRun(false);
  }
  const startFabrication = () => {
    //passe run à true
    setRun(true);
    timeleft = vitesse;
  };

  const calcScore = () => {
    const product = updatedWorld.products.filter(
      (product: any) => product.id === id
    );
    if (product.length > 0) {
      if (product[0].timeleft !== 0) {
        const elapsed = Date.now() - parseInt(updatedWorld.lastupdate);
        if (timeleft - elapsed <= 0) {
          const revenu = Math.round(
            cout *
              ((1 - Math.pow(croissance, quantite + quantite)) /
                (1 - croissance)) -
              cout * ((1 - Math.pow(croissance, quantite)) / (1 - croissance))
          );
          setRun(false);
          timeleft = 0;
          const money = updatedWorld.money + revenu;
          const products = updatedWorld.products.map((product: any) => {
            if (product.id === id) {
              return product.timeleft > 99 ? product.timeleft - 100 : 0;
            } else {
              return product;
            }
          });
          setUpdatedWorld(
            JSON.parse(
              JSON.stringify({
                ...updatedWorld,
                money: money,
                products: products,
              })
            )
          );
        } else if (timeleft === 0 && managerUnlocked) {
          startFabrication();
        } else {
          setRun(true);
        }
      }
    }
  };

  const savedCallback = useRef(calcScore);
  useEffect(() => (savedCallback.current = calcScore));

  useEffect(() => {
    let timer = setInterval(() => savedCallback.current(), 100);
    return function cleanup() {
      if (timer) clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    console.log(updatedWorld);
  }, [updatedWorld]);

  const [progress, setProgress] = useState(0);

  if (loading) console.log("Production in progress...");
  if (error) console.log(`Error during transaction ${error.message}`);
  if (data) {
    const productInProduction = data.lancerProductionProduit;
    const products = world.products.map((product) => {
      if (product.id === productInProduction.id) {
        return productInProduction;
      } else {
        return product;
      }
    });
    setWorld(
      JSON.parse(
        JSON.stringify({ ...world, products: products, lastupdate: Date.now() })
      )
    );
  }

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
            if (timeleft === 0) {
              startFabrication();
              lancer({ variables: { id: id } });
            }
          }}
        />
      </div>
      <div className="flex items-center m-6 pb-10 max-h-fit">
        <div className="w-48 mr-3">
          <MyProgrssBar
            vitesse={timeleft}
            className="w-full bg-gray rounded-full h-6 dark:bg-gray-700 relative"
            initialvalue={vitesse - timeleft}
            run={run}
            auto={managerUnlocked}
            orientation={Orientation.horizontal}
            onCompleted={onProgressbarCompleted}
          />
        </div>

        {/* <ButtonBuy
          quantity={quantiteBuy}
          cout={cout}
          image={imageCoin}
          worldMoney={world.money}
          id={id}
          timeleft={vitesse}
        ></ButtonBuy> */}
      </div>
    </div>
  );
};

export default CardProduct;
