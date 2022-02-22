import classNames from "classnames";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import {
  AddToBasketContext,
  BasketContext,
  CounterContext,
  DataContext,
} from "../../../Context";

export default function PizzaItem() {
  const { getData, setGetData } = useContext(DataContext);
  const { basket, setBasket } = useContext(BasketContext);
  const { addToBasket, setAddToBasket } = useContext(AddToBasketContext);
  const { sizeSelect, setSizeSelect } = useContext(CounterContext);

  function activateCrust(id) {
    setGetData(
      getData.map((item) => {
        if (item.id === id) {
          item.original = true;
          item.thin = false;
        }
        return item;
      })
    );
  }

  function activateCrust2(id) {
    setGetData(
      getData.map((item) => {
        if (item.id === id) {
          item.original = false;
          item.thin = true;
        }
        return item;
      })
    );
  }

  function activateSize(id) {
    setGetData(
      getData.map((item) => {
        if (item.id === id) {
          item.sizeSelect.small = true;
          item.sizeSelect.medium = false;
          item.sizeSelect.big = false;
        }
        return item;
      })
    );
    setSizeSelect(0);
  }

  function activateSize1(id) {
    setGetData(
      getData.map((item) => {
        if (item.id === id) {
          item.sizeSelect.small = false;
          item.sizeSelect.medium = true;
          item.sizeSelect.big = false;
        }
        return item;
      })
    );
    setSizeSelect(1);
  }

  function activateSize2(id) {
    setGetData(
      getData.map((item) => {
        if (item.id === id) {
          item.sizeSelect.small = false;
          item.sizeSelect.medium = false;
          item.sizeSelect.big = true;
        }
        return item;
      })
    );
    setSizeSelect(2);
  }

  function increase(id, element) {
    setGetData(
      getData.map((item) => {
        if (item.id === id) {
          item.count += 1;
          if (item.count > 1) {
            item.totalPrice = item.count * item.price;
          }
          setAddToBasket((oldArr) => [...new Set([...oldArr, element])]);
        }
        return item;
      })
    );
    setBasket(true);
  }
  return getData.map((item) => {
    const { img, name, count, size, sizeSelect, price, id, original, thin, crust } = item;
    //const totalPrice = item.totalPrice === 0 ? price : item.totalPrice;
    const totalPrice = item.totalPrice || price ;

    return (
      <div key={id} className="pizza-block">
        <img className="pizza-block__image" src={img} alt="Pizza" />
        <div className="pizza__title">
          <Link to="/basket">
            <svg
              className="basket"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="black"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                stroke="black"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                stroke="black"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          {count > 0 && <i className="basket-counter">{count}</i>}
          <h4 className="pizza-block__title">{name}</h4>
        </div>
        <div className="pizza-block__selector">
          <ul>
            <li
              onClick={() => activateCrust(id)}
              className={original ? "active" : ""}
            >
              {crust[0]}
            </li>
            <li
              onClick={() => activateCrust2(id)}
              className={thin ? "active" : ""}
            >
              {crust[1]}
            </li>
          </ul>
          <ul>
            <li
              onClick={() => activateSize(id)}
              className={classNames({
                active: sizeSelect.small === true,
                disabled: size[0] == false,
              })}
            >
              26см
            </li>
            <li
              onClick={() => activateSize1(id)}
              className={classNames({
                active: sizeSelect.medium === true,
                disabled: size[1] == false,
              })}
            >
              30см
            </li>
            <li
              onClick={() => activateSize2(id)}
              className={classNames({
                active: sizeSelect.big === true,
                disabled: size[2] == false,
              })}
            >
              40см
            </li>
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price"> {totalPrice} AZN</div>
          <div
            onClick={() => increase(id, item)}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{count}</i>
          </div>
        </div>
      </div>
    );
  });
}