import React, { ReactNode } from 'react';


type Props = {
    children: ReactNode
}

const TitleCard = ({children}: Props) => {
    return <h2 className="text-2xl font-bold text-yellow-light min-w-fit mx-auto text-center pt-5">{children}</h2>
}

export default TitleCard