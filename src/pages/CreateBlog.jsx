import { useState } from "react";
import backArrow from "../assets/back-arrow.png";
import addFolder from "../assets/folder-add.png";
import redberryLogo from "../assets/redberry-logo.png";
import errorImage from "../assets/error-message.svg";
import successImage from "../assets/success-button.png";

export const CreateBlog = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileValidation, setFileValidation] = useState("default");
  const [titleValidation, setTitleValidation] = useState("default");
  const [descriptionValidation, setDescriptionValidation] = useState("default");
  const [dateValidation, setDateValidation] = useState();
  const [emailValidation, setEmailValidation] = useState();
  const [authorValidation, setAuthorValidation] = useState({
    minLength: "default",
    minWords: "default",
    onlyGeorgian: "default",
  });

  const validateFile = (file) => {
    if (file) {
      const imageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/webp",
      ];
      if (imageTypes.includes(file.type)) {
        setFileValidation("green");
      } else {
        setFileValidation("red");
      }
    } else {
      setFileValidation("red");
    }
  };

  const validateAuthor = (value) => {
    const trimmedValue = value.trim();
    const georgianLetters = /^[\u10D0-\u10FA\s]+$/;
    const words = trimmedValue.split(/\s+/).filter(Boolean);

    const minLengthValid = trimmedValue.length >= 4;
    const minWordsValid = words.length >= 2;
    const onlyGeorgianValid = georgianLetters.test(trimmedValue);

    setAuthorValidation({
      minLength: minLengthValid ? "green" : "red",
      minWords: minWordsValid ? "green" : "red",
      onlyGeorgian: onlyGeorgianValid ? "green" : "red",
    });
  };

  const validateDate = (value) => {
    const isValid = value.length >= 8;
    setDateValidation(isValid ? "green" : "red");
  };

  const validateEmail = (value) => {
    if (value.trim().length === 0 || emailValidation === "green") {
      setEmailValidation("green");
      return;
    }

    const isValid = value === "@redberry.ge" || !value.endsWith("@redberry.ge");
    setEmailValidation(isValid ? "red" : "green");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    validateFile(file);
  };

  const handleAuthorChange = (event) => {
    const authorValue = event.target.value;
    validateAuthor(authorValue);
  };

  const handleTitleChange = (event) => {
    const titleValue = event.target.value;
    const isValid = titleValue.length >= 2;

    setTitleValidation(isValid ? "green" : "red");
  };

  const handleDescriptionChange = (event) => {
    const descriptionValue = event.target.value;
    const isValid = descriptionValue.length >= 2;

    setDescriptionValidation(isValid ? "green" : "red");
  };

  const handleDateChange = (event) => {
    const dateValue = event.target.value;
    validateDate(dateValue);
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;

    if (emailValue.trim().length === 0) {
      setEmailValidation("");
      return;
    }

    validateEmail(emailValue);
  };

  const handleSubmit = () => {
    if (isAllValid()) {
      console.log("Form submitted!");
    } else {
      console.log("Form validation failed!");
    }
  };

  const isAllValid = () => {
    return (
      fileValidation === "green" &&
      titleValidation === "green" &&
      descriptionValidation === "green" &&
      dateValidation === "green" &&
      (!emailValidation || emailValidation === "green") &&
      Object.values(authorValidation).every((val) => val === "green")
    );
  };

  const getBorderColorClass = (...validationStates) => {
    if (validationStates.includes("red")) return "invalid-border";
    if (validationStates.includes("green") && !validationStates.includes("red"))
      return "valid-border";
    return "default-border";
  };

  return (
    <>
      <header className="blog-header">
        <img src={redberryLogo} alt="redberry logo" />
      </header>
      <div className="container">
        <div className="heading">
          <img src={backArrow} alt="back arrow photo" />
          <h1> ბლოგის დამატება </h1>
        </div>

        <div className="blog-container">
          <h2 className="blog-h2"> ატვირთეთ ფოტო </h2>
          <div className="blog-form">
            <div>
              <img src={addFolder} alt="add folder icon" />
              <div className="add-file">
                <label> ჩააგდეთ ფაილი აქ ან </label>
                <input
                  type="file"
                  name="აირჩიეთ ფაილი"
                  className="file-input"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          {fileValidation === "red" && selectedFile && (
            <p
              className="file-text"
              style={{
                color: "red",
                fontFamily: "firaGo",
                fontSize: 18,
                fontWeight: 700,
                marginTop: 12,
              }}
            >
              სავალდებულოა ფოტო
            </p>
          )}
          {fileValidation === "green" && selectedFile && (
            <p
              className="file-text"
              style={{
                color: "green",
                fontFamily: "firaGo",
                fontSize: 18,
                fontWeight: 700,
                marginTop: 12,
              }}
            >
              ატვირთულია
            </p>
          )}

          <div className="container2">
            <div className="author">
              <label className="labels">ავტორი *</label>
              <input
                type="text"
                className={`inputs ${getBorderColorClass(
                  authorValidation.minLength,
                  authorValidation.minWords,
                  authorValidation.onlyGeorgian
                )}`}
                placeholder="შეიყვნეთ ავტორი"
                onChange={handleAuthorChange}
              />
              <ul>
                <li style={{ color: authorValidation.minLength }}>
                  მინიმუმ 4 სიმბოლო
                </li>
                <li style={{ color: authorValidation.minWords }}>
                  მინიმუმ ორი სიტყვა
                </li>
                <li style={{ color: authorValidation.onlyGeorgian }}>
                  მხოლოდ ქართული სიმბოლოები
                </li>
              </ul>
            </div>
            <div className="author ml-24">
              <label>სათაური *</label>
              <input
                type="text"
                className={`inputs ${getBorderColorClass(titleValidation)}`}
                placeholder="შეიყვნეთ სათაური"
                onChange={handleTitleChange}
              />
              <p style={{ color: titleValidation }}>მინიმუმ 2 სიმბოლო</p>
            </div>
          </div>
          <div className="container3">
            <label className="labels"> აღწერა * </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="შეიყვნეთ აღწერა"
              style={{
                border:
                  descriptionValidation === "green"
                    ? "1px solid #14d81c"
                    : descriptionValidation === "red"
                    ? "1px solid #ea1919"
                    : "1px solid #e4e3eb",
              }}
              onChange={handleDescriptionChange}
            ></textarea>
            <p style={{ color: descriptionValidation }} className="title-text">
              მინიმუმ 2 სიმბოლო
            </p>
          </div>
          <div className="container2">
            <div className="author">
              <label className="labels">გამოქვეყნების თარიღი *</label>
              <input
                type="date"
                className={`inputs ${
                  dateValidation === "green"
                    ? "valid-border"
                    : dateValidation === "red"
                    ? "invalid-border"
                    : "default-border"
                }`}
                onChange={handleDateChange}
              />
              {dateValidation === "red" && (
                <p style={{ color: "#ea1919" }}>სავალდებულოა</p>
              )}
              {dateValidation === "green" && (
                <p style={{ color: "#14d81c" }}>დამატებულია</p>
              )}
            </div>
            <div className="author ml-24">
              <label className="labels">კატეგორია *</label>
              <select className="inputs"></select>
            </div>
          </div>
          <div className="container3">
            <label className="labels"> ელ-ფოსტა </label>
            <input
              type="email"
              className={`inputs ${
                emailValidation === "green"
                  ? "valid-border"
                  : emailValidation === "red"
                  ? "invalid-border"
                  : "default-border"
              }`}
              placeholder="Example@redberry.ge"
              onChange={handleEmailChange}
            />
            {emailValidation === "red" && (
              <div className="email-validation-message red">
                <img src={errorImage} alt="invalid email" />
                <p>მეილი უნდა მთავრდებოდეს @redberry.ge-ით</p>
              </div>
            )}
            {emailValidation === "green" && (
              <div className="email-validation-message green">
                <img
                  src={successImage}
                  alt="valid email"
                  style={{ width: 20 }}
                />
                <p>დამატებულია</p>
              </div>
            )}
          </div>
          <button
            type="submit"
            className={`submit-btn ${
              isAllValid() ? "validated-submit-btn" : ""
            }`}
            onClick={handleSubmit}
            disabled={!isAllValid()}
          >
            გამოქვეყნება
          </button>
        </div>
      </div>
    </>
  );
};
