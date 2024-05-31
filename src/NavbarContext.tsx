import React, { createContext, useState, useEffect, ReactNode } from "react";

interface NavbarProviderProps {
  children: ReactNode;
}

export const NavbarContext = createContext({
  navbarHeight: 0,
  availableHeight: 0,
});

export const NavbarProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [availableHeight, setAvailableHeight] = useState(0);

  useEffect(() => {
    const setHeight = () => {
      const height = document.getElementById("navbar")?.offsetHeight || 0;
      setNavbarHeight(height);
      setAvailableHeight(window.innerHeight - height - 4); //idk why but without the -4px, there is an overflow
    };

    setHeight();
    window.addEventListener("resize", setHeight);
    return () => {
      window.removeEventListener("resize", setHeight);
    };
  }, []);

  return (
    <NavbarContext.Provider value={{ navbarHeight, availableHeight }}>
      {children}
    </NavbarContext.Provider>
  );
};