import { createContext, useEffect, useState } from "react";

import { Axios } from "./service";

export const DataContext = createContext();
export const LoadContext = createContext();
export const BasketContext = createContext();
export const CounterContext = createContext();
export const AddToBasketContext = createContext();
export const FirstPriceContext = createContext();

export default function Context({ children }) {
  const [getData, setGetData] = useState([]);
  const [load, setLoad] = useState(true);
  const [basket, setBasket] = useState(false);
  const [sizeSelect, setSizeSelect] = useState(0);
  const [addToBasket, setAddToBasket] = useState([]);
  const [firstPrice, setFirstPrice] = useState(0);

  async function fetchData() {
    try {
      const { data } = await Axios.get("/pizza.json");

      setGetData(() => data.map((item) => ({ ...item, totalPrice: 0 })));
      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  // console.log(getData)
  return (
    <DataContext.Provider value={{ getData, setGetData }}>
      <LoadContext.Provider value={{ load, setLoad }}>
        <BasketContext.Provider value={{ basket, setBasket }}>
          <CounterContext.Provider value={{ sizeSelect, setSizeSelect }}>
            <AddToBasketContext.Provider
              value={{ addToBasket, setAddToBasket }}
            >
              <FirstPriceContext.Provider value={{ firstPrice, setFirstPrice }}>
                {children}
              </FirstPriceContext.Provider>
            </AddToBasketContext.Provider>
          </CounterContext.Provider>
        </BasketContext.Provider>
      </LoadContext.Provider>
    </DataContext.Provider>
  );
}
