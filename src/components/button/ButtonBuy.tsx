import React, { ReactNode } from 'react';


type Props = {
    quantity:number,
    cout:number,
    image:string
}

const ButtonBuy = ({quantity,cout,image}: Props) => {
    return <button className='bg-pipe rounded-lg items-center mx-auto text-yellow-light'>

        <div className='flex mr-4 p-1 min-w-30'>
            <p className=' p-2'>Buy x</p>
            <p className=' p-2'>{quantity}</p>
        </div>
        <div className='items-center p-3 rounded-b-lg '>
            <p>{cout}</p>
            <img src={image} className="w-8 mx-auto mt-2"/>
        </div>
    </button>
}

export default ButtonBuy