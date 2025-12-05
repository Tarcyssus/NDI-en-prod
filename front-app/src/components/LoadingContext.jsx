import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingOverlay from "../pages/LoadingOverlay";

const LoadingContext = createContext();

export const LoadingShell = ({ children, gifPath, delay = 500 }) => {
  const location = useLocation();
  const [loadingCount, setLoadingCount] = useState(0);
  const loading = loadingCount > 0;

  const showLoading = useCallback(() => {
    setLoadingCount((count) => count + 1);
  }, []);

  const hideLoading = useCallback(() => {
    setLoadingCount((count) => Math.max(0, count - 1));
  }, []);

  // Affiche un court overlay à chaque navigation (et au premier rendu).
  useEffect(() => {
    showLoading();
    let completed = false;
    const id = setTimeout(() => {
      hideLoading();
      completed = true;
    }, delay);
    return () => {
      if (!completed) {
        hideLoading();
      }
      clearTimeout(id);
    };
  }, [location.key, delay, showLoading, hideLoading]);

  return (
      <LoadingContext.Provider
          value={{
            loading,
            showLoading,
            hideLoading,
          }}
      >
        <LoadingOverlay gifPath={gifPath} />
        {children}
      </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    return { loading: false, showLoading: () => {}, hideLoading: () => {} };
  }
  return ctx;
};
