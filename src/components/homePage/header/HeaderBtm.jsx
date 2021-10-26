import axios from "axios";
import { useContext, useState } from "react";
import { DataContext, LoadContext } from "../../../Context";
import SortPopUp from "../../sidePages/SortPopUp";


export default function HeaderBtm() {
  const { getData, setGetData } = useContext(DataContext)
  const { load, setLoad } = useContext(LoadContext)
  const [activeCategorie, setActiveCategorie] = useState(null)

  // const allCategories = [...new Set(getData.map(item => item.categorie))]
  const allCategories = ["Мясные", "Куриные", "Вегетерианские", "Острые"]

  //active class yaratmaq ucun yaradilmis funksiyadir
  function selectedCategorie(index) {
    setActiveCategorie(index)
  }

  async function filterCategorie(categorieName) {
    const { data } = await axios.get("https://test-002-3ddc6-default-rtdb.firebaseio.com/pizza.json")

    const filtered = data.filter(item => item.categorie === categorieName)
    setGetData(filtered)
  }

  async function selectAllCategorie() {
    setActiveCategorie(null)
    const { data } = await axios.get("https://test-002-3ddc6-default-rtdb.firebaseio.com/pizza.json")
    setGetData(data)
    setLoad(false)
  }

  return (
    <div className="content__top">
      <div className="categories">
        <ul>
          <li className={activeCategorie === null ? "active" : ""} onClick={selectAllCategorie}>Все</li>
          {allCategories.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  selectedCategorie(index)
                  filterCategorie(item)
                }}
                className={activeCategorie === index ? "active" : ''}>
                {item}
              </li>
            )
          })}
        </ul>
      </div>
      <SortPopUp />
    </div>

  )
}
