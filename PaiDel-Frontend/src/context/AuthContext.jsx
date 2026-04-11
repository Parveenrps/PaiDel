import { children } from "react";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCurrentUser = async () =>{
    try {
      const res = await getCurrentUser();
      console.log("Fetched current user: ", res.data.data);
      setUser(res.data.data);
    } catch (error) {
        console.log("chala NHI")
      setUser(null);
    } finally {
      setLoading(false);
    }
}

  useEffect( () => {
    fetchCurrentUser();
  }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
