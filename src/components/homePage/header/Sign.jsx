import { useState } from "react"



export default function Register() {
  const [signInForm, setSignInForm] = useState(false)
  const [signUpForm, setSignUpForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false);


  function signIn() {
    setSignInForm(true)
    setSignUpForm(false)
  }
  function signUp() {
    setSignUpForm(true)
    setSignInForm(false)
  }

  function showHidePassword() {
    setShowPassword(prev => !prev)
  }

  return (
    <>
      <ul className="sign">
        <li onClick={signIn}>Войти</li>
        <i className="divider"></i>
        <li onClick={signUp}>Регистрация</li>
      </ul>
      {signInForm && (
        <div onClick={()=>{
          setSignInForm(false)
          setSignUpForm(false)
        }} className="modal-layer">
          <div className="modal">
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
        </div>
      )}
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
            <form className="simform">
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
                    placeholder="Email"
                    type="text"
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
                      <i className="fas fa-asterisk"></i>
                    </span>
                  </label>
                  <input
                    className="string optional"
                    id="user-pw"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                  />
                  <span className="hide-password">
                    <i onClick={showHidePassword}
                      class={!showPassword ? "fas fa-eye close-eye" : "fas fa-eye-slash close-eye"}></i>
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
                    className="string optional"
                    id="user-pw-repeat"
                    placeholder="Repeat password"
                    type="password"
                  />
                </div>
              </div>
              <div className="simform__actions">
                <span className="simform__actions-sidetext">
                  <input
                    type="checkbox"
                    className="agreeTerms"
                  />
                  agree to
                  <a className="special" href="/">
                    Terms & Privacy
                  </a>
                </span>
                <button className="sumbit" type="submit">
                  Создать
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
