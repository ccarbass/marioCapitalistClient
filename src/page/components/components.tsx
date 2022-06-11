import React from "react";
import { ButtonYellow, CardProduct, CardManager, Header, Title1, Title2, Title3, SideBar, } from '../../components'

const Components = () => {
    return (<div className="bg-main w-full h-screen">
        <Header></Header>
        <div className="flex">
            <div >
                <SideBar>   
                    <div className="grid h-10 gap-10">
                    <ButtonYellow>Unlocks</ButtonYellow>
                    <ButtonYellow>Cash upgrades</ButtonYellow>
                    <ButtonYellow>Angel</ButtonYellow>
                    <ButtonYellow>Manager</ButtonYellow>
                        </div>             
                </SideBar>
            </div>
            <div>
                <Title1>Je suis un h1</Title1>
                <Title2>Je suis un h2</Title2>
                <Title3>Je suis un h3</Title3>
                <ButtonYellow>Buy x1</ButtonYellow>
                <CardProduct name={"Yoshi"} image={"/asset/yoshi2.gif"} cout={10} timeleft={15} quantite={300} imageCoin={'/asset/coin.png'}></CardProduct>
                <CardManager name="Yoshi Manager" image={"/asset/mario_yoshi.webp"} cout={16416}></CardManager>
            </div>
        </div>




    </div>)
}

export default Components