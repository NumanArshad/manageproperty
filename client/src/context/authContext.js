import React, { createContext, useEffect, useState } from "react"

const authContext = createContext({ userSession: undefined, setUserSession: () => { }, handleLogout: () => { } })

const AuthContextProvider = ({ children }) => {
    const [userSession, setUserSession] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("userSession"))
        }
        catch {
            return undefined
        }
    })
    const handleLogout = event => {
        event.preventDefault()
        setUserSession(undefined)
    }
    useEffect(() => {
        if (userSession) {
            localStorage.setItem("userSession", JSON.stringify(userSession))
        }

        else {
            localStorage.clear()
        }
    }, [userSession])

    return <authContext.Provider value={{ userSession, setUserSession, handleLogout }}>
        {children}
    </authContext.Provider>
}

export {
    AuthContextProvider, authContext
}