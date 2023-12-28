import { useState, useEffect } from "react";
import axios from "axios";
import redberryLogo from "../assets/redberry-logo.png";
import blogPagePhoto from "../assets/blog-page-photo.png";
import { LoginModal } from "../../components/LoginModal";
import { BlogCard } from "../../components/BlogCard";

export const HomePage = ({}) => {
  const [dataCategories, setDataCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
      <header>
        <img src={redberryLogo} alt="redberry logo" />
        <button type="submit" onClick={() => setIsModalOpen(true)}>
          შესვლა
        </button>
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
      <div className="blog-card-div">
        <BlogCard />
      </div>
    </div>
  );
};
