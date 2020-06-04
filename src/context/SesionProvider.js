import React from 'react'

const SesionContext = React.createContext()

const SesionProvider = (props) => {
    return (
        <SesionContext.Provider>
            {props.children}
        </SesionContext.Provider>
    )
}

export default SesionProvider
