
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/homePage/header/Header';
import HeaderLogo from './components/homePage/header/HeaderLogo';
import Main from './components/homePage/main/Main';
import Basket from './components/sidePages/Basket';
import './scss/app.scss'


function App() {

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Route exact path="/"><Header /><Main /></Route>
        <Route path="/basket"><HeaderLogo /><Basket /></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
