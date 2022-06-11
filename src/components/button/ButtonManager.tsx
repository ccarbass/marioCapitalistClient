import React, { ReactNode } from 'react';


type Props = {
    children: ReactNode
}

const ButtonManager = ({children}: Props) => {
    return <button className='bg-red rounded-lg p-1 min-w-fit text-yellow-light mt-7'>{children}</button>
}

export default ButtonManager