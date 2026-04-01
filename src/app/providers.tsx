"use client";

import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "../lib/store";
import { PersistGate } from "redux-persist/integration/react";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate 
        loading={null} 
        persistor={persistor}
        onBeforeLift={() => setIsHydrated(true)}
      >
        {isHydrated ? children : <div className="invisible">{children}</div>}
      </PersistGate>
    </Provider>
  );
};

export default Providers;
