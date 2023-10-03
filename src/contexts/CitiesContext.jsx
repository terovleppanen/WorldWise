import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      const abortController = new AbortController();

      async function fetchCities() {
        try {
          setIsLoading(true);

          const res = await fetch(`${BASE_URL}/cities`, {
            signal: abortController.signal,
          });
          const data = await res.json();

          setCities(data);
        } catch (error) {
          if (error.name !== "AbortError")
            alert("There was an error loading data");
        } finally {
          setIsLoading(false);
        }
      }
      fetchCities();

      return () => abortController.abort();
    },
    [setCities, setIsLoading]
  );

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error(
      "You failed! You used CitiesContext outside CitiesProvider."
    );

  return context;
}

export { CitiesProvider, useCities };
