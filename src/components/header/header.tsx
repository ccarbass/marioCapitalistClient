import React from "react";
import { Title1, Title2,Title3, Input, ButtonYellow } from "../index";


const Header = () => {
    return (<div className="bg-red w-full ">
        <div className="flex justify-between p-3 ">
            <div className="flex space-x-7 items-center">

            <div className="flex items-center">
                <img src="/asset/logo.png" className="w-1/4" />
                <Title1>Mario world</Title1>
            </div>
            <div className="flex space-x-5 items-center">
                <Title2>253125</Title2>
                <img src="/asset/coin.png" className="w-small"/>
            </div>
            </div>
            <div className="flex space-x-7 items-center">
                
            <div>
                <ButtonYellow>Buy x100</ButtonYellow>
            </div>
            <div>
                <Title3>Votre nom</Title3>
                <Input></Input>
            </div>

            </div>

        </div>


    </div>)
}

export default Header