import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { createContext, useEffect, useState } from "react";
export const Context = createContext();
const baseurl = import.meta.env.VITE_SERVER_BASS_URL;
const Layout = () => {
  const [user, setUser] = useState();
  const [loadding, setLoadding] = useState(true);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
    setLoadding(false);
  });

  const value = { user, loadding, setLoadding };
  return (
    <>
      <Context.Provider value={value}>
        <Header />
        <Outlet />
        <Footer />
      </Context.Provider>
    </>
  );
};
export default Layout;
