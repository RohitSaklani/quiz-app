import { ReactNode, createContext, useContext, useState } from "react";
import GlobalLoader from "../components/GlobalLoader";

type LoadingType = { isLoading: boolean; opacity?: number };

interface LoadingContextType {
  loading: LoadingType;
  setLoader: (data: LoadingType) => void;
}

const LoaderContext = createContext<LoadingContextType>({
  loading: {
    isLoading: true,
    opacity: 50,
  },
  setLoader: () => {},
});

export function LoaderContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<LoadingType>({
    isLoading: true,
    opacity: 50,
  });

  function setLoader(data: LoadingType) {
    setLoading({ ...loading, ...data });
  }

  return (
    <LoaderContext.Provider value={{ loading, setLoader }}>
      {loading.isLoading ? (
        <GlobalLoader opacity={loading.opacity ? loading.opacity : 50} />
      ) : (
        <></>
      )}
      {children}
    </LoaderContext.Provider>
  );
}

const useLoaderContext = () => useContext(LoaderContext);

export default useLoaderContext;
