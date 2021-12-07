import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AddToBasketContext } from "../../../Context";
import HeaderLogo from "./HeaderLogo";
import Popup from "reactjs-popup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Axios } from "service";

const schema = yup.object().shape({
  email: yup.string().email("email is not valid").required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  acceptTerms: yup.bool().oneOf([true], "Accept Ts & Cs is required"),
});

export default function HeaderTop() {
  const { addToBasket } = useContext(AddToBasketContext);
  const [signForm, setSignForm] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const pizzaPriceSum = addToBasket.reduce((acc, item) => {
    return acc + item.price * item.count;
  }, 0);
  const pizzaCountSum = addToBasket.reduce((acc, item) => {
    return acc + item.count;
  }, 0);

  function signIn() {
    setSignForm(true);
  }

  function signUp() {
    setSignForm(false);
  }

  const registForm = (data) => {
    console.log(data);
    Axios.post(
      "https://test-003-69327-default-rtdb.firebaseio.com/pizzaUsersRegistrForm.json",
      data
    );
  };

  const loginForm = (data) => {
    console.log(data);
    Axios.post(
      "https://test-003-69327-default-rtdb.firebaseio.com/pizzaUsersLoginForm.json",
      data
    );
  };

  return (
    <div className="header">
      <div className="container">
        <HeaderLogo />
        <div className="header__cart">
          <Popup
            trigger={
              <ul className="sign">
                <li onClick={signIn}>Войти</li>
                <i className="divider"></i>
                <li onClick={signUp}>Регистрация</li>
              </ul>
            }
            modal
            nested
          >
            {(close) => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="modal-container">
                  <div className="`logmod`">
                    <div className="logmod__wrapper">
                      <div className="logmod__container">
                        <ul className="logmod__tabs">
                          {signForm && (
                            <li data-tabtar="lgm-2">
                              <a href="/">Вход</a>
                            </li>
                          )}
                          {!signForm && (
                            <li data-tabtar="lgm-1">
                              <a href="/">Регистрация</a>
                            </li>
                          )}
                        </ul>
                        <div className="logmod__tab-wrapper">
                          {!signForm && (
                            <div className="logmod__tab lgm-1">
                              <div className="logmod__heading">
                                <span className="logmod__heading-subtitle">
                                  Введите свои данные{" "}
                                  <strong>для регистрации</strong>
                                </span>
                              </div>
                              <div className="logmod__form">
                                {/* ============ first form ============ */}
                                <form
                                  onSubmit={handleSubmit(registForm)}
                                  className="simform"
                                >
                                  <div className="sminputs">
                                    <div className="input full">
                                      <label
                                        className="string optional"
                                        htmlFor="user-name"
                                      >
                                        <span className="span-asterisk">
                                          Email
                                          <i className="fas fa-asterisk"></i>
                                        </span>
                                      </label>
                                      <input
                                        {...register("email")}
                                        className="string optional"
                                        id="user-email"
                                        placeholder="Email"
                                        type="text"
                                      />
                                      <span className="errorMessage">
                                        {errors.email?.message}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="sminputs">
                                    <div className="input string optional">
                                      <label
                                        className="string optional"
                                        htmlFor="user-pw"
                                      >
                                        <span className="span-asterisk">
                                          Password
                                          <i className="fas fa-asterisk"></i>
                                        </span>
                                      </label>
                                      <input
                                        {...register("password")}
                                        className="string optional"
                                        id="user-pw"
                                        placeholder="Password"
                                        type="password"
                                      />
                                      <span className="errorMessage">
                                        {errors.password?.message}
                                      </span>
                                    </div>
                                    <div className="input string optional">
                                      <label
                                        className="string optional"
                                        htmlFor="user-pw-repeat"
                                      >
                                        <span className="span-asterisk">
                                          Repeat Password
                                          <i className="fas fa-asterisk"></i>
                                        </span>
                                      </label>
                                      <input
                                        {...register("confirmPassword")}
                                        className="string optional"
                                        id="user-pw-repeat"
                                        placeholder="Repeat password"
                                        type="password"
                                      />
                                      <span className="errorMessage">
                                        {errors.confirmPassword?.message}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="simform__actions">
                                    <span className="simform__actions-sidetext">
                                      <input
                                        {...register("acceptTerms")}
                                        type="checkbox"
                                        className="agreeTerms"
                                      />
                                      agree to{" "}
                                      <a className="special" href="/">
                                        Terms & Privacy
                                      </a>
                                    </span>
                                    <button className="sumbit" type="submit">
                                      Создать
                                    </button>
                                  </div>
                                  <span className="errorAccept">
                                    {errors.acceptTerms?.message}
                                  </span>
                                </form>
                              </div>
                            </div>
                          )}
                          {signForm && (
                            <div className="logmod__tab lgm-2">
                              <div className="logmod__heading">
                                <span className="logmod__heading-subtitle">
                                  Введите свой email и пароль{" "}
                                  <strong>для входа</strong>
                                </span>
                              </div>
                              <div className="logmod__form">
                                {/*================ second form================== */}
                                <form
                                  onSubmit={handleSubmit(loginForm)}
                                  className="simform"
                                >
                                  <div className="sminputs">
                                    <div className="input full">
                                      <label
                                        className="string optional"
                                        htmlFor="user-name"
                                      >
                                        <span className="span-asterisk">
                                          Email
                                          <i className="fas fa-asterisk"></i>
                                        </span>
                                      </label>
                                      <input
                                        className="string optional"
                                        id="user-email"
                                        placeholder="Email.."
                                        type="text"
                                        {...register("email")}
                                      />
                                      <span className="errorMessage">
                                        {errors.email?.message}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="sminputs">
                                    <div className="input full">
                                      <label
                                        className="string optional"
                                        htmlFor="user-pw"
                                      >
                                        <span className="span-asterisk">
                                          Password
                                          <i className="fas fa-asterisk"></i>
                                        </span>
                                      </label>
                                      <input
                                        className="string optional"
                                        id="user-pw"
                                        size="50"
                                        placeholder="пароль.."
                                        type="password"
                                        {...register("password")}
                                      />
                                      <span className="errorMessage">
                                        {errors.password?.message}
                                      </span>
                                      <span className="hide-password">
                                        Show
                                      </span>
                                    </div>
                                  </div>
                                  <div className="simform__actions">
                                    <span className="simform__actions-sidetext">
                                      <a className="special" href="/">
                                        Forgot your password?
                                      </a>
                                    </span>
                                    <button className="sumbit" type="submit">
                                      Войти
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Popup>
          <Link to="/basket" className="button button--cart">
            <span>{pizzaPriceSum} AZN</span>
            <div className="button__delimiter"></div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{pizzaCountSum}</span>
          </Link>
          {/* <div className="lang-change">
            <select className="lang" name="" id="">
              <option value="ru">RU</option>
              <option value="az">AZ</option>
              <option value="en">EN</option>
            </select>
          </div> */}
        </div>
      </div>
    </div>
  );
}
