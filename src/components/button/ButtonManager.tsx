import React, { ReactNode } from 'react';


type Props = {
    children: ReactNode,
    disabled:boolean,
}

const ButtonManager = ({children,disabled}: Props) => {
    return <button disabled={false} className='bg-red rounded-lg p-1 min-w-fit text-yellow-light mt-7'>{children}</button>
}

export default ButtonManager