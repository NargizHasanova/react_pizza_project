
import React, { useContext } from 'react'
import { LoadContext } from '../../../Context';
import PizzaItem from './PizzaItem';
import WaitingGif from './WaitingGif';

export default function Main() {
    const { load, setLoad } = useContext(LoadContext);

    return (
        <div className="content">
            <div className="container">
                <div className="content__items">
                    {load ? <><div>loading...</div><WaitingGif /></> : (
                        <PizzaItem />
                    )}
                </div>
            </div>
        </div>
    )
}
