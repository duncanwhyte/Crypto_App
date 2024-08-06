"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./lib/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  const persistedStore = persistStore(storeRef.current);
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistedStore}>
        {children}
      </PersistGate>
    </Provider>
  );
}
