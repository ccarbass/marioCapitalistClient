import React, { useState, useEffect } from "react";
import {
  ButtonYellow,
  Header,
  SideBar,
  CardProduct,
  ModalManager,
  ModalOnProgress,
} from "../components";
import { gql, useMutation } from "@apollo/client";
import { WorldContext } from "../context/WorldContext";
import { World } from "../world";

type MainProps = {
  loadworld: World;
  username: string;
};

const Main = ({ loadworld, username }: MainProps) => {
  const [world, setWorld] = useState(
    JSON.parse(JSON.stringify(loadworld)) as World
  );
  const [quantite, setQuantite] = useState(1);
  const [modalManager, setModalManager] = useState(false);
  const [modalOnProgress, setModalOnProgress] = useState(false);

  const acheterProduit = gql`
    mutation acheterQtProduit($id: Int!, $quantite: Int!) {
      acheterQtProduit(id: $id, quantite: $quantite) {
        id
        quantite
      }
    }
  `;

  const [acheter] = useMutation(acheterProduit, {
    context: { headers: { "x-user": username } },
  });

  const handleAchatProduit = (id: number) => {
    const product = world.products.filter((product) => product.id === id)[0];
    const montant = Math.round(
      product.cout *
        ((1 - Math.pow(product.croissance, product.quantite + quantite)) /
          (1 - product.croissance)) -
        product.cout *
          ((1 - Math.pow(product.croissance, product.quantite)) /
            (1 - product.croissance))
    );

    if (world.money - montant >= 0) {
      console.log(`Achat de ${quantite} quantité de produit numéro ${id} `);
      const products = world.products.map((product) => {
        if (product.id == id) {
          product.quantite += quantite;
        }
        return product;
      });

      acheter({ variables: { id: id, quantite: quantite } });
      setWorld(
        JSON.parse(
          JSON.stringify({
            ...world,
            money: world.money - montant,
            products: products,
          })
        )
      );
    }
  };

  const lancerProduction = gql`
    mutation LancerProductionProduit($id: Int!) {
      lancerProductionProduit(id: $id) {
        id
      }
    }
  `;

  const [lancer] = useMutation(lancerProduction, {
    context: { headers: { "x-user": username } },
  });
  const handleLancerProduction = (id: number) => {
    console.log(`Lancement production du produit numéro ${id} `);
    // TODO: acheter produit
    lancer({ variables: { id: id } });

    const products = world.products.map((product) => {
      if (product.id == id) {
        product.timeleft = product.vitesse;
      }
      return product;
    });

    setWorld(
      JSON.parse(
        JSON.stringify({
          ...world,
          products: products,
        })
      )
    );
  };

  const handleFinirProduction = (id: number) => {
    // TODO: acheter produit
    console.log(`Fin production du produit numéro ${id}`);

    const product = world.products.filter((product) => product.id === id)[0];
    const revenu = product.revenu * product.quantite;
    setWorld(
      JSON.parse(
        JSON.stringify({
          ...world,
          money: world.money + revenu,
        })
      )
    );
  };

  useEffect(() => {
    console.log(world);
  }, [world]);

  

  return (
    <>
      {world ? (
        <div className="bg-main bg-no-repeat bg-cover w-full h-full cursor-couronne">
          <Header
            name={world.name}
            logo={world.logo}
            money={world.money}
            changerQT={(value: number) => {
              setQuantite(value);
            }}
          ></Header>
          <div ></div>
          <div className="flex">
            <div>
              <SideBar>
                <div className="grid h-10 gap-8">
                  <div onClick={() => setModalOnProgress(!modalOnProgress)}>
                    <ButtonYellow>Unlocks</ButtonYellow>
                  </div>
                  <div onClick={() => setModalOnProgress(!modalOnProgress)}>
                    <ButtonYellow>Cash upgrades</ButtonYellow>
                  </div>{" "}
                  <div onClick={() => setModalOnProgress(!modalOnProgress)}>
                      <ButtonYellow>Angel</ButtonYellow>
                    </div>
                    <div onClick={() => setModalManager(!modalManager)}>
                      <ButtonYellow>Manager</ButtonYellow>
                    </div>
                  
                </div>
              </SideBar>
            </div>
            {modalOnProgress ? (
              <ModalOnProgress></ModalOnProgress>
            ) : ( modalManager ? (
              <ModalManager></ModalManager>
            ) : (
              <div className="grid-cols-3 grid gap-4 mt-6 mx-auto h-fit">
                {world.products.map((product) => {
                  let image = product.logo;
                  let name = product.name;
                  product.palliers.map((pallier) => {
                    if (pallier.unlocked === true) {
                      image = pallier.logo;
                      name = pallier.name;
                    }
                  });
                  return (
                    <CardProduct
                      id={product.id}
                      name={name}
                      image={image}
                      cout={product.cout}
                      timeleft={product.timeleft}
                      quantite={product.quantite}
                      croissance={product.croissance}
                      imageCoin={"/asset/coin.png"}
                      world={world}
                      vitesse={product.vitesse}
                      managerUnlocked={product.managerUnlocked}
                      quantiteBuy={quantite}
                      achatProduit={() => handleAchatProduit(product.id)}
                      lancerProduction={() =>
                        handleLancerProduction(product.id)
                      }
                      finirProduction={() => {
                        handleFinirProduction(product.id);
                      }}
                      onProductionDone={() => {
                        handleFinirProduction(product.id);
                      }}
                    ></CardProduct>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-main bg-no-repeat bg-cover w-full h-full cursor-couronne">
          <Header
            name=""
            logo=""
            money={0}
            changerQT={(value: number) => {
              console.log(value);
            }}
          ></Header>
        </div>
      )}
    </>
  );
};

export default Main;
