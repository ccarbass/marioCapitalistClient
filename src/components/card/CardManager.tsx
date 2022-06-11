import React from "react";
import {TitleCard, Title2, ButtonManager} from '..'

type Props = {
    name:string,
    image:string,
    cout:number,
   
}

const CardManager =({name,image,cout}:Props)=>{
    return (<div className="bg-blue w-fit min-h-min rounded-md flex p-2"> 
    <div className="mx-auto items-center">
        <img src={image} className=" mx-auto mt-5 w-3/4 "/>
    </div>
    <div className="items-center mt-6 mx-6 pb-10">
        <TitleCard>{name}</TitleCard>
        <div className="flex pt-5">
            
        <Title2>{cout}</Title2>
        <img src='./asset/coin.png' className='h-6 w-6 ml-5'/>
        </div>
        <ButtonManager>Débloquer</ButtonManager>
    

    </div>

        
      
      
    </div>)
}

export default CardManager