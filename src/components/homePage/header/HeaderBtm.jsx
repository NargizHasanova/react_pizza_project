import { useContext, useState } from "react";
import { Axios } from "../../../service";
import { DataContext, LoadContext } from "../../../Context";
import SortPopUp from "../../sidePages/SortPopUp";

export default function HeaderBtm() {
  const { setGetData } = useContext(DataContext);
  const { setLoad } = useContext(LoadContext);
  const [ activeCategorie, setActiveCategorie ] = useState(null);

  // const allCategories = [...new Set(getData.map(item => item.categorie))]
  const allCategories = ["Мясные", "Куриные", "Вегетерианские", "Острые"];

  //active class yaratmaq ucun yaradilmis funksiyadir
  function selectedCategorie(index) {
    setActiveCategorie(index);
  }

  async function filterCategorie(categorieName) {
    const { data } = await Axios.get("/pizza.json");
    const myData = data.map((item) => ({ ...item, totalPrice: 0 }))
    const filtered = myData.filter((item) => item.categorie === categorieName);
    setGetData(filtered);
  }

  async function selectAllCategorie() {
    setActiveCategorie(null);
    const { data } = await Axios.get("/pizza.json");
    const myData = data.map((item) => ({ ...item, totalPrice: 0 }))
    setGetData(myData);
  }

  return (
    <div className="content__top">
      <nav className="categories">
        <ul>
          <li
            className={activeCategorie === null ? "active" : ""}
            onClick={selectAllCategorie}
          >
            Все
          </li>
          {allCategories.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  selectedCategorie(index);
                  filterCategorie(item);
                }}
                className={activeCategorie === index ? "active" : ""}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </nav>
      <SortPopUp />
    </div>
  );
}
