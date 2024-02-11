import {createContext} from "react";
import {Jwts, User} from "../api/auth";

export interface IAuthContext {
    user: User | null;
    jwtTokens: Jwts | null;
    registerUser: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    loginUser: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    logoutUser: () => void;
    refreshToken: (data: Jwts) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export default AuthContext;