import React, { ReactNode } from 'react';


type Props = {
    children: ReactNode
}

const Title2 = ({children}: Props) => {
    return <h2 className="text-xl font-medium text-yellow-light">{children}</h2>
}

export default Title2