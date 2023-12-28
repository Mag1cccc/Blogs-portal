import { useState, useEffect } from "react";
import axios from "axios";
import redberryLogo from "../assets/redberry-logo.png";
import blogPagePhoto from "../assets/blog-page-photo.png";
import { LoginModal } from "../../components/LoginModal";
import { BlogCard } from "../../components/BlogCard";

export const HomePage = ({}) => {
  const [dataCategories, setDataCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token] = useState(
    "afe8866805908dc79d5a55f82d8e36dc4bc7ac1a9337fc5c80074f784321cb1d"
  );
  const [blogsList, setBlogsList] = useState([]);

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
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://api.blog.redberryinternship.ge/api/blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setBlogsList(response?.data?.data);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, [token]);

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
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
};
