import React, { useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { UserContext } from "../../context/UserContext";
import { WorldContext } from "../../context/WorldContext";

type Props = {
  quantity: number;
  cout: number;
  image: string;
  worldMoney: number;
  id: number;
  timeleft: number;
  onClick: () => void
};

const acheterProduit = gql`
  mutation acheterQtProduit($id: Int!, $quantite: Int!) {
    acheterQtProduit(id: $id, quantite: $quantite) {
      id
      quantite
    }
  }
`;

const ButtonBuy = ({
  quantity,
  cout,
  image,
  worldMoney,
  id,
  timeleft,
  onClick,
}: Props) => {
  return (
    <div>
      {worldMoney >= cout * quantity || true ? (
        <button
          className="bg-pipe rounded-lg items-center mx-auto text-yellow-light"
          onClick={() => {
            onClick();
          }}
        >
          <div className="flex mr-4 min-w-30">
            <p className=" p-2">Buy x</p>
            <p className=" p-2">{quantity}</p>
          </div>
          <div className="items-center rounded-b-lg ">
            <p>{cout}</p>

            <img src={image} className="w-8 mx-auto mt-1" />
          </div>
        </button>
      ) : (
        <button
          className="bg-pipe rounded-lg items-center mx-auto text-yellow-light cursor-not-allowed"
          disabled={true}
        >
          <div className="flex mr-4 min-w-30">
            <p className=" p-2">Buy x</p>
            <p className=" p-2">{quantity}</p>
          </div>
          <div className="items-center rounded-b-lg ">
            <p>{cout}</p>

            <img src="/asset/notmoney.png" className="w-8 mx-auto mt-1 " />
          </div>
        </button>
      )}
    </div>
  );
};

export default ButtonBuy;
