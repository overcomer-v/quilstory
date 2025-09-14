import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/mfirebase";
import { supabase } from "../utils/supabase-client";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setUser] = useState(null);
  const [userName, setUserName] = useState();

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session.user ?? null);
       const user = data?.session?.user;
        setUser(user ?? null);

        if (user) {
        const provider = user.identities?.[0]?.provider;

        if(provider === "google"){
          setUserName(user.user_metadata.full_name);
        }else if(provider === "email"){
            supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .then(({data}) => {
          setUserName(data[0].username);
        });
        }}
        alert(user);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);

          const user = session?.user;
        setUser(user ?? null);

        if (user) {
        const provider = user.identities?.[0]?.provider;

        if(provider === "google"){
          setUserName(user.user_metadata.full_name);
        }else if(provider === "email"){
            supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .then(({data}) => {
          setUserName(data[0].username);
        });
        }}
        alert(user);
        setLoading(false);
        console.log(session?.user);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, userName }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
