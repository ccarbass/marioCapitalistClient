import React from "react";
import { TitleCard, Title2, ButtonManager } from "..";

type Props = {
  name: string;
  image: string;
  cout: number;
  worldMoney: number;
};

const CardManager = ({ name, image, cout, worldMoney }: Props) => {
  return (
    <div className="bg-blue rounded-md flex p-2 w-96">
      <div className="mx-auto items-center">
        <img
          src={`http://localhost:4000/${image}`}
          className=" mx-auto mt-5 max-h-72 "
        />
      </div>

      <div className="items-center mt-6 mx-6 pb-10">
        <TitleCard>{name}</TitleCard>
        {worldMoney >= cout ? (
          <div>
            <div className=" pt-5">
              <Title2>Acheter : {cout}</Title2>
              <img src="./asset/coin.png" className="h-6 w-6 ml-5" />
            </div>
            <ButtonManager disabled={false}>Débloquer</ButtonManager>
          </div>
        ) : (
          <div>
            <div className=" pt-5">
              <Title2>Acheter : {cout}</Title2>
              <img src="./asset/notmoney.png" className="h-6 w-6 ml-5" />
            </div>
            <div className="cursor-not-allowed">
            <ButtonManager disabled={true}>Débloquer</ButtonManager>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardManager;
