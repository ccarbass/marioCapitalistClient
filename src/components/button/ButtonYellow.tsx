import React, { ReactNode } from 'react';


type Props = {
    children: ReactNode
}

const ButtonYellow = ({children}: Props) => {
    return <button className='bg-yellow rounded-lg p-1 min-w-min'>{children}</button>
}

export default ButtonYellow