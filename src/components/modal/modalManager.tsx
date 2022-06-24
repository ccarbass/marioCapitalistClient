import React, { ReactNode } from 'react';

import { WorldContext } from "../../context/WorldContext";
import{CardManager,Title1} from "../index"

type Props = {
    children: ReactNode,
}

const ModalManager = () => {
    const worldContext = React.useContext(WorldContext);

    return <div className='p-12 bg-gray-dark mx-auto'>
        <Title1>Managers</Title1>

    <div className="grid-cols-3 grid gap-4 mt-6">
    {worldContext.world && worldContext.world.managers.map((manager) => {
        return (
            <CardManager
            
            name={manager.name}
            image={manager.logo}
            cout={manager.seuil}
            worldMoney={worldContext.world? worldContext.world.money:4}
            
        
        ></CardManager>
        );
    })}
    </div>
  </div>}

export default ModalManager