import React, { ReactNode } from 'react';


type Props = {
    children: ReactNode
}

const Title1 = ({children}: Props) => {
    return <h1 className="text-3xl font-bold text-yellow-light">{children}</h1>
}

export default Title1