import { getCurrentUser } from "@/services/auth";
import { IUser } from "@/types/user";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";



interface AuthContextType {
    user: IUser | null;
    isLoading:boolean;
    setUser: (user: IUser | null) => void;
    setIsLoading:Dispatch<SetStateAction<boolean>>
}

// Create the context with an initial empty value
const UserContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const UserProvider = ({children} : {children: ReactNode}) => {

    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleUser = async() => {
        const user = await getCurrentUser();
        setUser(user);
        setIsLoading(false);
    }

    useEffect(() => {
        handleUser();
    }, [isLoading])

    return(
        <UserContext.Provider value={{user, setUser, isLoading, setIsLoading}}>
            {children}
        </UserContext.Provider>
    )
}

// Custom hook for using the context
export const useUser = () => {
    const context = useContext(UserContext);
    if(context === undefined) {
        throw new Error("useUser Must be used within the UseProvider context")
    }
    return context
}