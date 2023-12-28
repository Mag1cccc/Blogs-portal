import { useState, useEffect } from "react";
import axios from "axios";
import redberryLogo from "../assets/redberry-logo.png";
import blogPagePhoto from "../assets/blog-page-photo.png";
import { Link } from "react-router-dom";

export const CreateBlogHomePage = ({}) => {
  const [dataCategories, setDataCategories] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://api.blog.redberryinternship.ge/api/categories")
        .then((response) => {
          setDataCategories(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, []);

  return (
    <div>
      <header>
        <img src={redberryLogo} alt="redberry logo" />
        <Link to="/create-blog">
          <button type="submit" className="add-blog-btn">
            დაამატე ბლოგი
          </button>
        </Link>
      </header>

      <section>
        <h1>ბლოგი</h1>
        <img src={blogPagePhoto} alt="blog page photo" />
      </section>

      <div className="categories">
        {console.log(dataCategories)}
        {dataCategories.map((element) => {
          return (
            <h4
              key={element.id}
              style={{
                color: element.text_color,
                backgroundColor: element.background_color,
              }}
            >
              {element.title}
            </h4>
          );
        })}
      </div>
    </div>
  );
};
