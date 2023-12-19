import axios from "axios";
import svgImage from "../src/assets/add.svg";
import errorImage from "../src/assets/error-message.svg";
import successImage from "../src/assets/success-button.png";
import { useState } from "react";

export const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isValidated, setIsValidated] = useState(true);
  const [usernameValidated, setUsernameValidated] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValid(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, isValid);
    if (email === "@redberry.ge" || !email.endsWith("@redberry.ge")) {
      setIsValid(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.blog.redberryinternship.ge/api/login",
        { email: email }
      );

      if (response.status === 204) {
        setUsernameValidated(true);
      }
    } catch (error) {
      setIsValidated(false);
    }
  };

  return (
    <>
      <div className="modal-background"> </div>
      <div className="login-modal">
        <div className="close-button">
          <button onClick={onClose} className="btn-stealth">
            <img src={svgImage} alt="close button" />
          </button>
        </div>

        {usernameValidated ? (
          <div className="validated">
            <img src={successImage} alt="success icon" />
            <p>წარმატებული ავტორიზაცია</p>
            <button className="button"> კარგი </button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h3> შესვლა </h3>
            </div>
            <div className="inputs">
              <label> ელ-ფოსტა </label>
              <input
                placeholder="Example@redberry.ge"
                value={email}
                onChange={handleEmailChange}
              />
              {(!isValid || !isValidated) && (
                <div className="validation-message">
                  <img src={errorImage} alt="error image" />
                  <p className="error-message"> ელ-ფოსტა არ მოიძებნა </p>
                </div>
              )}
              <button type="submit" onClick={handleSubmit} className="button">
                შესვლა
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
