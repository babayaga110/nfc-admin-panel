import React, { createContext, useContext, useState } from 'react';

// Define the context
const DrawerContext = createContext();

// Create a Provider Component
const DrawerProvider = ({ children }) => {
  const [drawerState, setDrawerState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if ( event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  return (
    <DrawerContext.Provider value={{ drawerState, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

// Custom hook to use the Drawer context
const useDrawer = () => useContext(DrawerContext);

export { DrawerProvider, useDrawer };
