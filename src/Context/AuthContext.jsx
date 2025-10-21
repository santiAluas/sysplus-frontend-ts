import { createContext, useContext } from "react";
import { Decrypt_User } from '../services/Storage_Service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const ObtenerUsuarioLogin =  () => {
        return Decrypt_User();
    };

    return (
        <AuthContext.Provider value={{ ObtenerUsuarioLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
