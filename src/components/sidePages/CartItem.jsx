import classNames from "classnames"
import { useContext, useState } from "react"
import { AddToBasketContext, BasketContext, CounterContext, DataContext, FirstPriceContext } from "../../Context"



function CartItem() {
    const [stopPriceDecrease, setStopPriceDecrease] = useState(true)
    const { addToBasket, setAddToBasket } = useContext(AddToBasketContext)
    const { getData, setGetData } = useContext(DataContext)
    const { firstPrice, setFirstPrice } = useContext(FirstPriceContext)

    function increasePizzaItem(id, price) {
        // setFirstPrice(oldArr => [...oldArr, price])
        setGetData(getData.map(item => {
            if (item.id === id) {
                item.count = item.count + 1
                item.price = item.price + firstPrice
                setStopPriceDecrease(true)
            }
            return item
        }))
    }
    console.log(firstPrice)
    function decreasePizzaItem(id, price) {
        // setFirstPrice(oldArr => [...oldArr, price])
        setGetData(getData.map(item => {
            if (item.id === id) {
                if (item.count > 1) {
                    item.count = item.count - 1
                    setStopPriceDecrease(true)
                }
                if (item.count === 1) {
                    setStopPriceDecrease(false)
                }
                if (stopPriceDecrease === true) {
                    item.price = item.price - firstPrice
                }
            }
            return item
        }))
    }

    function removePizzaItem(id) {
        const filtered = addToBasket.filter(item => item.id !== id)
        setAddToBasket(filtered)

        setGetData(getData.map(item => {
            if (filtered.length === 0) {
                item.count = 0
            }
            return item
        }))
    }
    function addSelectedSizeToBasket(sizeSelect, size) {
        if (sizeSelect.small === true) {
            return size[0]
        } else if (sizeSelect.medium === true) {
            return size[1]
        } else if (sizeSelect.big === true) {
            return size[2]
        }
    }
    return (
        addToBasket.map(item => {
            const { id, img, count, name, crust, size, price, sizeSelect } = item
            return (
                <div key={id} className="cart__item">
                    <div className="cart-up-desc">
                        <div className="cart__item-img">
                            <img
                                className="pizza-block__image"
                                src={img}
                                alt="Pizza"
                            />
                        </div>
                        <div className="cart__item-info">
                            <h3>{name}</h3>
                            <p>
                                {addSelectedSizeToBasket(sizeSelect, size)}
                            </p>
                        </div>
                    </div>
                    <div className="mobile--block">
                        <div className="cart__item-count">
                            <div
                                onClick={() => decreasePizzaItem(id, price)}
                                className="button button--outline button--circle cart__item-count-minus">
                                <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                                        fill="#EB5A1E"
                                    />
                                    <path
                                        d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                                        fill="#EB5A1E"
                                    />
                                </svg>
                            </div>
                            <b>{count}</b>
                            <div
                                onClick={() => increasePizzaItem(id, price)}
                                className="button button--outline button--circle cart__item-count-plus">
                                <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                                        fill="#EB5A1E"
                                    />
                                    <path
                                        d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                                        fill="#EB5A1E"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="cart__item-price">
                            <b>{price} AZN</b>
                        </div>
                        <div className="cart__item-remove">
                            <button
                                onClick={() => removePizzaItem(id)}
                                className={classNames('button', 'button--circle', 'button--outline')}>
                                <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                                        fill="#EB5A1E"
                                    />
                                    <path
                                        d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                                        fill="#EB5A1E"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )
        })

    )
}

export default CartItem
