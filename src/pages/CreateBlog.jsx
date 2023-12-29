import { useState, useEffect } from "react";
import backArrow from "../assets/back-arrow.png";
import addFolder from "../assets/folder-add.png";
import redberryLogo from "../assets/redberry-logo.png";
import errorImage from "../assets/error-message.svg";
import successImage from "../assets/success-button.png";
import { CategoriesDropdown } from "../../components/CategoriesDropdown";
import { AddedBlogModal } from "../../components/AddedBlogModal";

export const CreateBlog = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileValidation, setFileValidation] = useState("default");
  const [titleValidation, setTitleValidation] = useState("default");
  const [descriptionValidation, setDescriptionValidation] = useState("default");
  const [dateValidation, setDateValidation] = useState();
  const [emailValidation, setEmailValidation] = useState();
  const [categoriesValidation, setCategoriesValidation] = useState("default");
  const [formData, setFormData] = useState(null);
  const [token] = useState(
    "afe8866805908dc79d5a55f82d8e36dc4bc7ac1a9337fc5c80074f784321cb1d"
  );
  const [submitTrigger, setSubmitTrigger] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [authorValidation, setAuthorValidation] = useState({
    minLength: "default",
    minWords: "default",
    onlyGeorgian: "default",
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const loadFormDataFromLocalStorage = () => {
      try {
        const savedFormData = localStorage.getItem("formData");
        if (savedFormData) {
          const savedFileURL = localStorage.getItem("selectedPhoto");

          if (savedFileURL) {
            setSelectedPhoto(savedFileURL);
          }
          const parsedFormData = JSON.parse(savedFormData);

          setAuthor(parsedFormData.author);
          setTitle(parsedFormData.title);
          setDescription(parsedFormData.description);
          setDate(parsedFormData.date);
          setCategory(parsedFormData.category);
          setEmail(parsedFormData.email);
        }
      } catch (error) {
        console.error("Error loading from localStorage:", error);
      }
    };

    loadFormDataFromLocalStorage();
  }, []);

  const getFormData = () => {
    return {
      selectedPhoto,
      author,
      title,
      description,
      date,
      category,
      email,
    };
  };

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

  const validateCategories = (selectedCategories) => {
    const isValid = selectedCategories.length > 0;
    setCategoriesValidation(isValid ? "green" : "red");
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
    setSelectedPhoto(file);
    const fileURL = URL.createObjectURL(file);
    setSelectedFile(file);
    validateFile(file);

    localStorage.setItem(
      "formData",
      JSON.stringify({ ...getFormData(), selectedPhoto: file })
    );
  };

  const handleAuthorChange = (event) => {
    const newAuthor = event.target.value;
    setAuthor(newAuthor);
    localStorage.setItem(
      "formData",
      JSON.stringify({ ...getFormData(), author: newAuthor })
    );
    validateAuthor(newAuthor);
  };

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    localStorage.setItem(
      "formData",
      JSON.stringify({ ...getFormData(), title: newTitle })
    );
    const isValid = newTitle.length >= 2;

    setTitleValidation(isValid ? "green" : "red");
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
    localStorage.setItem(
      "formData",
      JSON.stringify({ ...getFormData(), description: newDescription })
    );
    const isValid = newDescription.length >= 2;

    setDescriptionValidation(isValid ? "green" : "red");
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setDate(newDate);
    localStorage.setItem(
      "formData",
      JSON.stringify({ ...getFormData(), date: newDate })
    );
    validateDate(newDate);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    localStorage.setItem(
      "formData",
      JSON.stringify({ ...getFormData(), email: newEmail })
    );

    if (newEmail.trim().length === 0) {
      setEmailValidation("");
      return;
    }

    validateEmail(newEmail);
  };

  const isAllValid = () => {
    return (
      fileValidation === "green" &&
      titleValidation === "green" &&
      descriptionValidation === "green" &&
      dateValidation === "green" &&
      categoriesValidation === "green" &&
      (!emailValidation || emailValidation === "green") &&
      Object.values(authorValidation).every((val) => val === "green")
    );
  };

  useEffect(() => {
    const submitForm = () => {
      if (formData && isAllValid()) {
        var form = new FormData();
        form.append("title", title);
        form.append("description", description);
        form.append("image", selectedPhoto);
        form.append("author", author);
        form.append("publish_date", date);
        form.append("categories", `[1,2,3]`);
        if (emailValidation) {
          form.append("email", email);
        }
        fetch("https://api.blog.redberryinternship.ge/api/blogs", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: form,
        })
          .then((response) => {
            if (response.ok) {
              setFormSubmitted(true);
            } else {
              console.log(
                "Failed to submit form. Server responded with:",
                response.status
              );
            }
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
          });
      } else {
        console.log("Form data is invalid or missing!");
      }
    };

    if (submitTrigger) {
      submitForm();
      setSubmitTrigger(false);
    }
  }, [formData, token, submitTrigger]);

  const handleFormSubmit = () => {
    const currentFormData = getFormData();
    setFormData(currentFormData);
    setSubmitTrigger(true);
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
                  name="file"
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
                value={author}
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
                value={title}
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
              value={description}
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
                value={date}
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
              <CategoriesDropdown validateCategories={validateCategories} />
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
              value={email}
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
            onClick={handleFormSubmit}
            disabled={!isAllValid()}
          >
            გამოქვეყნება
          </button>
        </div>
      </div>
      <div>{formSubmitted && <AddedBlogModal />}</div>
    </>
  );
};
