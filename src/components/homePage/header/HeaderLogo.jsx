import { Link } from 'react-router-dom'
import logo from '../../../assets/img/pizza-logo.svg'

export default function HeaderLogo() {
    return (
        <div className="header__logo box">
            <Link to="/"><img width="38" src={logo} alt="Pizza logo" /></Link>
            <Link to="/" className="logo-desc">
                <h1>PizzaLand</h1>
                <p>самая вкусная пицца во вселенной</p>
            </Link>
        </div>
    )
}
