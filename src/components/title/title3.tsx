import React, { ReactNode } from 'react';


type Props = {
    children: ReactNode
}

const Title3 = ({children}: Props) => {
    return <h1 className="text-xs text-yellow-light">{children}</h1>
}

export default Title3