import React, { ReactNode } from "react";
import { Product, World } from "../../world";
import { WorldContext } from "../../context/WorldContext";
import { CardProduct } from "../index";

type Props = {
  quantiteBuy: number;
  world: World;
  setWorld: (value: JSON) => void;
};

const ModalProduct = ({ quantiteBuy, world, setWorld }: Props) => {
  return (
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
        return <></>;
      })}
    </div>
  );
};

export default ModalProduct;
