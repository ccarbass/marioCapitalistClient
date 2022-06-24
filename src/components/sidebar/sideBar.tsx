import React, { ReactNode } from 'react';


type Props = {
    children: ReactNode
}

const SideBar = ({children}: Props) => {
    return <div className='bg-red min-w-fit text-gray h-sidebar  mr-6 py-8 px-8'>{children}</div>
}

export default SideBar