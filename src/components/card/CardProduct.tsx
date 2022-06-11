import React from "react";
import {ButtonBuy,  TitleCard, ProgressBarProduct} from '..'

type Props = {
    name:string,
    image:string,
    cout:number,
    quantite:number,
    timeleft:number,
    imageCoin:string
}

const CardProduct =({name,image,cout,quantite,timeleft, imageCoin}:Props)=>{
    return (<div className="bg-red w-fit min-h-min rounded-md"> 
    <div className="mx-auto items-center">
        <TitleCard>{name}</TitleCard>
        <img src={image} className=" mx-auto w-5/12"/>
    </div>
    <div className="flex items-center m-6 pb-10">
        <div className="w-48 mr-3"><ProgressBarProduct></ProgressBarProduct></div>

        <ButtonBuy quantity={quantite} cout={cout} image={imageCoin}></ButtonBuy>
    </div>

        
      
      
    </div>)
}

export default CardProduct