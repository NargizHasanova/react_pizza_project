import { DataContext, LoadContext } from "../../Context";
import { useEffect, useRef, useState, useContext } from "react";

import { Axios } from "service";

export default function SortPopUp() {
  const allSortItems = ["популярности", "цене", "алфавиту"];
  const [sort, setSort] = useState("популярности");
  const [visibility, setVisibility] = useState(false);
  const { getData, setGetData } = useContext(DataContext);
  const { setLoad } = useContext(LoadContext);
  const ref = useRef();

  function sortSelected(e) {
    setSort(e);
    setVisibility((prev) => !prev);
    const collator = new Intl.Collator();

    switch (e) {
      case "цене":
        return setGetData(
          getData
            .map((item) => {
              return item;
            })
            .sort(function (a, b) {
              return a.price - b.price;
            })
        );
      case "алфавиту":
        return setGetData(
          getData.map((item) => {
            return item;
          })
            .sort((a, b) => collator.compare(a.name, b.name))
        );

      default:
        async function fetchData() {
          try {
            const { data } = await Axios.get(
              "https://test001-f52b4-default-rtdb.firebaseio.com/pizza.json"
            );

            setGetData(data);
            setLoad(false);
          } catch (err) {
            console.log(err);
          }
        }
        fetchData();
    }
  }

  function showPopUp() {
    setVisibility((prev) => !prev);
  }

  // function handleOutsideClick(e) {
  //     if (!e.path.includes(ref.current)) { //div.sort
  //         setVisibility(false)
  //     }
  // }

  // useEffect(() => {
  //     document.body.addEventListener('click', handleOutsideClick)
  // }, [])

  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }
  useOnClickOutside(ref, () => setVisibility(false));
  return (
    <div ref={ref} className="sort">
      <div className="sort__label">
        <svg
          className={visibility ? "arrow-move" : ""}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={showPopUp}>{sort}</span>
      </div>
      <div className={`${visibility ? "d-block" : "d-none"} sort__popup`}>
        <ul>
          {allSortItems.map((item, index) => {
            return (
              <li
                onClick={() => sortSelected(item)}
                key={index}
                className={sort === item ? "active" : ""}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
