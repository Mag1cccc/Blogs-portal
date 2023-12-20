import { useState } from "react";
import backArrow from "../assets/back-arrow.png";
import addFolder from "../assets/folder-add.png";
import redberryLogo from "../assets/redberry-logo.png";

export const CreateBlog = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileValidation, setFileValidation] = useState("default");
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    validateFile(file);
  };

  const handleAuthorChange = (event) => {
    const authorValue = event.target.value;
    validateAuthor(authorValue);
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
                className="inputs"
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
                className="inputs"
                placeholder="შეიყვნეთ სათაური"
              />
              <p>მინიმუმ 2 სიმბოლო</p>
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
            ></textarea>
            <p>მინიმუმ 2 სიმბოლო</p>
          </div>
          <div className="container2">
            <div className="author">
              <label className="labels">გამოქვეყნების თარიღი *</label>
              <input type="date" className="inputs  " />
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
              className="inputs"
              placeholder="Example@redberry.ge"
            />
          </div>
          <button type="submit" className="submit-btn">
            გამოქვეყნება
          </button>
        </div>
      </div>
    </>
  );
};
