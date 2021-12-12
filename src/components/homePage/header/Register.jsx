import { Axios } from "service";
import Popup from "reactjs-popup";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


export default function Register() {
  const [signInForm, setSignInForm] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptTermsError, setAcceptTermsError] = useState(true)
  const history = useHistory()

  useEffect(() => {
    if (firstName.length < 2) {
      setFirstNameError(true)
    } if (firstName.length >= 2 || firstName.length === 0) {
      setFirstNameError(false)
    }
    if (password.length < 4) {
      setPasswordError(true)
    } if (password.length === 0 || password.length >= 4) {
      setPasswordError(false)
    }
    if (repeatPassword !== password) {
      setRepeatPasswordError(true)
    }
    if (repeatPassword.length === 0 || repeatPassword === password) {
      setRepeatPasswordError(false)
    }

  }, [firstName, password, repeatPassword])

  function signIn() {
    setSignInForm(true);
    setSignUpForm(false);
  }

  function signUp() {
    setSignUpForm(true);
    setSignInForm(false);
  }

  function showHidePassword() {
    setShowPassword(prev => !prev)
  }

  async function submitSignUpForm(e) {
    e.preventDefault()
    const filterItem = email.split('').filter(el => el === "@")
    if (filterItem.length !== 1) {
      setEmailError(true)
      return
    }
    if(acceptTerms === false){
      setAcceptTermsError(false)
      return
    }
    if (firstNameError === true || password === true || password !== repeatPassword || repeatPassword === true || acceptTerms === false) {
      return
    }
    
    await axios.post("https://test-003-69327-default-rtdb.firebaseio.com/signUp.json",
      {
        id: Date.now(),
        firstName,
        email,
        password
      }
    )
    history.push('/');
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  return (
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
        <div className={`modal ${signUpForm && 'modal-height'}`}>
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="modal-container">
            <div className="`logmod`">
              <div className="logmod__wrapper">
                <div className="logmod__container">
                  <ul className="logmod__tabs">
                    {signInForm && (
                      <li data-tabtar="lgm-2">
                        <a href="/">Вход</a>
                      </li>
                    )}
                    {signUpForm && (
                      <li data-tabtar="lgm-1">
                        <a href="/">Регистрация</a>
                      </li>
                    )}
                  </ul>
                  <div className="logmod__tab-wrapper">
                    {signUpForm && (
                      <div className="logmod__tab lgm-1">
                        <div className="logmod__heading">
                          <span className="logmod__heading-subtitle">
                            Введите свои данные{" "}
                            <strong>для регистрации</strong>
                          </span>
                        </div>
                        <div className="logmod__form">
                          {/* ============ first form ============ */}
                          <form className="simform" onSubmit={submitSignUpForm}>
                            <div className="sminputs">
                              <div className="input full">
                                <label
                                  className="string optional"
                                  htmlFor="user-name"
                                >
                                  <span className="span-asterisk">
                                    Name
                                    <i className={`fas fa-asterisk ${firstNameError ? "d-block" : "d-none"}`}></i>
                                  </span>
                                </label>
                                <input
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  className="string optional"
                                  id="user-name"
                                  placeholder="name..."
                                  type="text"
                                  pattern="[a-zA-Z]*"
                                  required
                                />
                                {firstNameError && <span className="warning">введенное имя некорректно</span>}
                              </div>
                            </div>
                            <div className="sminputs">
                              <div className="input full">
                                <label
                                  className="string optional"
                                  htmlFor="user-name"
                                >
                                  <span className="span-asterisk">
                                    Email
                                    <i className={`fas fa-asterisk ${emailError ? "d-block" : "d-none"}`}></i>
                                  </span>
                                </label>
                                <input
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="string optional"
                                  id="user-email"
                                  placeholder="Email..."
                                  type="email"
                                  required
                                />
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
                                    <i className={`fas fa-asterisk ${passwordError ? "d-block" : "d-none"}`}></i>
                                  </span>
                                </label>
                                <input
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  className="string optional"
                                  id="user-pw"
                                  placeholder="password..."
                                  type={showPassword ? "text" : "password"}
                                  required
                                />
                                {passwordError && <span className="warning">слишком короткий пароль</span>}
                                <span className="hide-password">
                                  <i onClick={showHidePassword}
                                    className={!showPassword ? "fas fa-eye close-eye" : "fas fa-eye-slash close-eye"}></i>
                                </span>
                              </div>
                              <div className="input string optional">
                                <label
                                  className="string optional"
                                  htmlFor="user-pw-repeat"
                                >
                                  <span className="span-asterisk">
                                    Repeat Password
                                    <i className={`fas fa-asterisk ${repeatPasswordError ? "d-block" : "d-none"}`}></i>
                                  </span>
                                </label>
                                <input
                                  value={repeatPassword}
                                  onChange={(e) => setRepeatPassword(e.target.value)}
                                  className="string optional"
                                  id="user-pw-repeat"
                                  placeholder="repeat password..."
                                  type="password"
                                  required
                                />
                                {repeatPasswordError && <span className="warning">пароли не совпадают</span>}
                              </div>
                            </div>
                            <div className="simform__actions">
                              <span className={`simform__actions-sidetext ${!acceptTerms && !acceptTermsError && "errorMessage"}`}>
                                <input
                                  type="checkbox"
                                  checked={acceptTerms}
                                  onChange={()=> setAcceptTerms(prev => !prev)}
                                  className="agreeTerms"
                                />
                                agree to
                                <a className={`special ${!acceptTerms  && !acceptTermsError && "errorMessage"}`} href="/">
                                  Terms & Privacy
                                </a>
                                <i className={`fas fa-asterisk acceptTermsWarning ${!acceptTerms && !acceptTermsError ? "d-block" : "d-none"}`}></i>
                              </span>
                              
                              <button className="sumbit" type="submit">
                                Создать
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                    {signInForm && (
                      <div className="logmod__tab lgm-2">
                        <div className="logmod__heading">
                          <span className="logmod__heading-subtitle">
                            Введите свой email и пароль{" "}
                            <strong>для входа</strong>
                          </span>
                        </div>
                        <div className="logmod__form">
                          {/*================ second form================== */}
                          <form className="simform" >
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
                                />
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
                                  type={showPassword ? "text" : "password"}
                                />
                                <span className="hide-password">
                                  <i onClick={showHidePassword}
                                    class={!showPassword ? "fas fa-eye close-eye" : "fas fa-eye-slash close-eye"}></i>
                                </span>
                              </div>
                            </div>
                            <div className="simform__actions">
                              <span className="simform__actions-sidetext">
                                <i class="far fa-question-circle"></i>
                                <a className="special" href="/">
                                  Забыли пароль?
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
  )
}
